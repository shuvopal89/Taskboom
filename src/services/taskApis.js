import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDateFormatter } from "../hooks/useDateFormatter";

const API_URL =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_DEV_API_URL}/task`
    : `${import.meta.env.VITE_PROD_API_URL}/task`

const token = {
  Authorization: `Bearer ${localStorage.getItem("_token")}`,
}

export const taskApis = createApi({
  reducerPath: 'taskApis',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Task', 'Opt'],
  endpoints: (builder) => ({
    getTasksAndLabels: builder.query({
      query: () => ({
        url: '/getTasksAndLabels',
        method: 'GET',
        headers: token
      }),
      providesTags: ['Task']
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: '/createTask',
        method: 'POST',
        body: data.task,
        headers: token
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        let insTask = {
          _id: crypto.randomUUID(),
          ...data.task,
          createdAt: new Date()
        }

        const patchResult = dispatch(
          taskApis.util.updateQueryData('getTasksAndLabels', undefined, (draft) => {
            if (data._iAB) {
              draft.tasks.push(insTask);
            } else {
              draft.tasks.unshift(insTask);
            }
          })
        )

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Task']
    }),
    createLabel: builder.mutation({
      query: (label) => ({
        url: '/createLabel',
        method: 'POST',
        body: label,
        headers: token
      }),
      async onQueryStarted(label, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getTasksAndLabels', undefined, (draft) => {
            draft.labels.push({
              _id: crypto.randomUUID(),
              ...label,
              isRegular: false,
              createdAt: new Date()
            });
          })
        )

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/deleteTask/${id}`,
        method: 'DELETE',
        headers: token
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getTasksAndLabels', undefined, (draft) => {
            const updated = draft.tasks.filter((task) => task._id !== id);
            draft.tasks = updated;
          })
        )

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Task']
    }),
    changeStatus: builder.mutation({
      query: (opt) => ({
        url: `/changeStatus/${opt.taskId}`,
        method: 'PUT',
        body: {
          status: opt.ctStatus
        },
        headers: token
      }),
      async onQueryStarted(opt, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getTasksAndLabels', undefined, (draft) => {
            const updated = draft.tasks.map((task) => {
              if (task._id === opt.taskId) {
                return {
                  ...task,
                  status: opt.ctStatus
                }
              }
              return task;
            })
            draft.tasks = updated;
          })
        )

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }

      },
      invalidatesTags: ['Task'],
    }),
    changeToAllCompleted: builder.mutation({
      query: () => ({
        url: '/changeToAllCompleted',
        method: 'PUT',
        headers: token
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getTasksAndLabels', undefined, (draft) => {
            const updated = draft.tasks.map((task) => {
              if (task.status === 'Running' && useDateFormatter(new Date()) === useDateFormatter(new Date(task.createdAt))) {
                return {
                  ...task,
                  status: 'Completed'
                }
              }
              return task;
            })
            draft.tasks = updated;
          })
        )

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Task']
    }),
    isAddToBottom: builder.mutation({
      query: (data) => ({
        url: '/isAddToBottom',
        method: 'PUT',
        body: data,
        headers: token
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getOpt', undefined, (draft) => {
            draft.opt._iAB = data?.value
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Opt']
    }),
    isExpand: builder.mutation({
      query: (data) => ({
        url: '/isExpand',
        method: 'PUT',
        body: data,
        headers: token
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getOpt', undefined, (draft) => {
            draft.opt._iE = data?.value
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Opt'],
    }),
    isRedirect: builder.mutation({
      query: (data) => ({
        url: '/isRedirect',
        method: 'PUT',
        body: data,
        headers: token
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getOpt', undefined, (draft) => {
            draft.opt._iR = data?.value
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Opt']
    }),
    getOpt: builder.query({
      query: () => ({
        url: '/getOpt',
        method: 'GET',
        headers: token
      }),
      providesTags: ['Opt']
    }),
    search: builder.query({
      query: (value) => ({
        url: '/search',
        method: 'GET',
        params: value,
        headers: token
      }),
      providesTags: ['Task']
    }),
    deleteLabel: builder.mutation({
      query: (name) => ({
        url: `/deleteLabel/${name}`,
        method: 'DELETE',
        headers: token
      }),
      invalidatesTags: ['Task']
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/deleteAccount',
        method: 'DELETE',
        headers: token
      })
    }),
    editTask: builder.mutation({
      query: (data) => ({
        url: `/editTask/${data.id}`,
        method: 'PUT',
        body: {
          title: data.title,
          label: data.label,
          priority: data.priority,
          status: data.status
        },
        headers: token
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApis.util.updateQueryData('getTasksAndLabels', undefined, (draft) => {
            const updated = draft.tasks.map((task) => {
              if (task._id === data.id) {
                return {
                  ...task,
                  title: data.title,
                  label: data.label,
                  priority: data.priority,
                  status: data.status
                }
              }
              return task;
            })
            draft.tasks = updated;
          })
        )

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Task']
    })
  }),
});

export const { useGetTasksAndLabelsQuery, useCreateLabelMutation, useCreateTaskMutation, useDeleteTaskMutation, useChangeStatusMutation, useChangeToAllCompletedMutation, useIsAddToBottomMutation, useIsExpandMutation, useIsRedirectMutation, useGetOptQuery, useSearchQuery, useDeleteLabelMutation, useDeleteAccountMutation, useEditTaskMutation } = taskApis;