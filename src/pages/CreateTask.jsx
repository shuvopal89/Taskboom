import React, { useState } from 'react'
import CreateButton from '../components/CreateButton'
import CreateTaskOption from '../components/CreateTaskOption'
import { allStatus, allPriorities } from '../utils/utils'
import Title from '../components/Title'
import { useCreateTaskMutation, useGetOptQuery, useGetTasksAndLabelsQuery } from '../services/taskApis'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function CreateTask() {
  const { data } = useGetTasksAndLabelsQuery();
  const { data: opt } = useGetOptQuery();
  const [errorMsg, setErrorMsg] = useState("");
  const [createTask, { isLoading }] = useCreateTaskMutation()
  const navigate = useNavigate()
  const [task, setTask] = useState({
    title: '',
    label: 'Regular',
    priority: 'Low',
    status: 'New'
  })

  const createTaskHandler = async () => {
    try {
      const result = await createTask({task, _iAB: opt?.opt?._iAB}).unwrap();
      toast.success(result?.msg, {
        style: {
          background: "#1f2937",
          color: "#f3f4f6",
          fontSize: "14px",
          padding: "15px 20px",
          border: "1px solid #374151",
        },
      });
      setErrorMsg("");
      setTask({ ...task, title: '' })
      switch (task.status) {
        case 'New':
          opt?.opt?._iR && navigate('/new-tasks');
          break;
        case 'Running':
          opt?.opt?._iR && navigate('/running-tasks');
          break;
        case 'Completed':
          opt?.opt?._iR && navigate('/completed-tasks');
          break;
        case 'Canceled':
          opt?.opt?._iR && navigate('/canceled-tasks');
          break;
      }
    } catch (err) {
      setErrorMsg(err?.data?.msg);
    }
  }

  return (
    <div className='p-3'>
      <Title title={"Taskboom - Create Task"} />
      {/* Create task header section */}
      <div className='flex items-center justify-between'>
        <p className='text-md text-gray-200'>Create a new task</p>
        <CreateButton title='Create' width={'w-32'} handler={createTaskHandler} isLoading={isLoading} />
      </div>
      {/* Create task title section */}
      <input onChange={(e) => {
        setTask({ ...task, title: e.target.value })
        setErrorMsg("")
      }} autoFocus className={`w-full mt-4 p-4 rounded-xl bg-gray-800 text-sm placeholder:text-gray-500 caret-gray-500 resize-none placeholder:font-medium outline-none border-2 ${errorMsg ? 'border-red-500' : 'border-gray-700 focus:border-gray-700'}`} name="task" placeholder='Task title' value={task.title} />
      {/* Create task option section */}
      <div className='grid grid-cols-3 items-start max-md:grid-cols-1 gap-3 mt-3'>
        {
          [
            { id: 1, title: 'Add to label', data: data?.labels },
            { id: 2, title: 'Priority', data: allPriorities },
            { id: 3, title: 'Status', data: allStatus },
          ].map((item, index) => {
            return (
              <CreateTaskOption
                key={index}
                id={item.id}
                title={item.title}
                data={item.data}
                label={task.label}
                priority={task.priority}
                status={task.status}
                task={task}
                setTask={setTask}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default CreateTask
