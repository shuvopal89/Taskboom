import React, { useContext } from 'react'
import Task from '../components/Task'
import TaskCommonHeader from '../components/TaskCommonHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import { useGetTasksAndLabelsQuery } from '../services/taskApis';
import { useDateFormatter } from '../hooks/useDateFormatter';
import Default from '../components/default/Default'
import { ServerContext } from '../context/ServerContext';
import TaskSkeleton from '../components/Skeleton/TaskSkeleton';

function LabelTasks() {
    const { label } = useParams();
    const { data, isLoading } = useGetTasksAndLabelsQuery()
    const { date, setDate } = useContext(ServerContext)
    const navigate = useNavigate();

    const tasks = data?.tasks?.filter(task => (task?.status === 'New' || task?.status === 'Running') && task?.label === label && useDateFormatter(new Date(date)) === useDateFormatter(new Date(task?.createdAt)));

    if (isLoading) return <TaskSkeleton />

    return (
        <div className='p-3'>
            <Title title={`Taskboom - Label (${label})`} />
            {/* New tasks header */}
            <div className='flex items-center gap-2'>
                <div onClick={() => {
                    navigate(-1)
                    setDate(new Date())
                }} className='h-10 w-10 border flex-shrink-0 border-gray-900 active:bg-gray-800 active:border-gray-700 hover:cursor-pointer grid place-items-center rounded-full transition-all'>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className='text-lg text-gray-200'
                    />
                </div>
                <TaskCommonHeader label={label} />
            </div>
            {
                tasks?.length <= 0 ? (
                    <Default
                        icon={faListCheck}
                        title={"No New Tasks"}
                        desc={"All your daily new tasks under this label will be appear here and also can filter by date."}
                    />
                ) : (
                    <div className='mt-3 grid divide-y divide-gray-700 rounded-xl border border-gray-700'>
                        {
                            tasks?.map((item, index) => {
                                return (
                                    <div className='bg-gray-800 p-1 commonTasksSection' key={index}>
                                        <Task
                                            id={item?._id}
                                            title={item?.title}
                                            status={item?.status}
                                            label={item?.label}
                                            priority={item?.priority}
                                            created={item?.createdAt}
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

export default LabelTasks
