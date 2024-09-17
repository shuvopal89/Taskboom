import React, { useContext } from 'react'
import Task from '../components/Task'
import TaskCommonHeader from '../components/TaskCommonHeader';
import Title from '../components/Title';
import { useGetTasksAndLabelsQuery } from '../services/taskApis';
import Default from '../components/default/Default';
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { useDateFormatter } from '../hooks/useDateFormatter';
import { ServerContext } from '../context/ServerContext';
import TaskSkeleton from '../components/Skeleton/TaskSkeleton';

function NewTasks() {
  const { date } = useContext(ServerContext);
  const { data, isLoading } = useGetTasksAndLabelsQuery();
  const tasks = data?.tasks?.filter(task => task?.status === 'New' && useDateFormatter(new Date(task?.createdAt)) === useDateFormatter(new Date(date)));

  if (isLoading) return <TaskSkeleton />

  return (
    <div className='p-3'>
      <Title title={"Taskboom - New Task"} />
      {/* New tasks header */}
      <TaskCommonHeader label={'TODAY'} />
      {
        tasks?.length <= 0 ? (
          <Default
            icon={faListCheck}
            title={"No New Tasks"}
            desc={"All your daily new tasks will be appear here and also can filter by date."}
          />
        ) : (
          <div className='mt-3 grid divide-y divide-gray-700 rounded-xl border border-gray-700'>
            {
              tasks?.map((task, index) => {
                return (
                  <div className='bg-gray-800 p-1 commonTasksSection' key={index}>
                    <Task
                      id={task?._id}
                      title={task?.title}
                      status={task?.status}
                      label={task?.label}
                      priority={task?.priority}
                      created={task?.createdAt}
                    />
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default NewTasks
