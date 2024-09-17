import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Title from '../components/Title';
import CreateButton from '../components/CreateButton';
import CreateTaskOption from '../components/CreateTaskOption';
import { useEditTaskMutation, useGetTasksAndLabelsQuery } from '../services/taskApis';
import { allPriorities, allStatus } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

function EditTask() {
    const [errorMsg, setErrorMsg] = useState("");
    const { id } = useParams();
    const { data } = useGetTasksAndLabelsQuery();
    const [editTask, { isLoading }] = useEditTaskMutation()
    const getTask = data?.tasks?.find((task) => task?._id === id);
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: getTask?.title,
        label: getTask?.label,
        priority: getTask?.priority,
        status: getTask?.status
    })

    const createTaskHandler = async () => {
        try {
            const result = await editTask({id, ...task}).unwrap();
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
            setTask({ ...task, title: '' });
            navigate(-1);
        } catch (err) {
            setErrorMsg(err?.data?.msg);
        }
    }

    return (
        <div className='p-3'>
            <Title title={"Taskboom - Edit Task"} />
            {/* Edit task header section */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div onClick={() => {
                        navigate(-1)
                    }} className='h-10 w-10 border flex-shrink-0 border-gray-900 active:bg-gray-800 active:border-gray-700 hover:cursor-pointer grid place-items-center rounded-full transition-all'>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className='text-lg text-gray-200'
                        />
                    </div>
                    <p className='text-md text-gray-200'>Edit a task</p>
                </div>
                <CreateButton title={'Update'} width={'w-28'} handler={createTaskHandler} isLoading={isLoading} />
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

export default EditTask
