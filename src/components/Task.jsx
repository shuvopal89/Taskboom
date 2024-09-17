import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DesignContext } from '../context/DesignContext';
import { allStatus } from '../utils/utils';
import { ServerContext } from '../context/ServerContext';
import { useChangeStatusMutation, useGetOptQuery } from '../services/taskApis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Task({ id, title, status, label, priority }) {
    const { data } = useGetOptQuery();
    const [isExpand, setIsExpand] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [changeStatus] = useChangeStatusMutation()
    const { setDeletePopup } = useContext(DesignContext);
    const { setClickTaskId } = useContext(ServerContext)
    const checkStatus = status !== 'Completed';
    const commonStyle = "text-[11px] px-3 py-[5px] border font-medium rounded-full";
    const navigate = useNavigate();

    const changeStatusHandler = async (taskId, ctStatus) => {
        setShowStatus(false);
        try {
            const result = await changeStatus({ taskId, ctStatus }).unwrap();
            toast.success(result?.msg, {
                style: {
                    background: "#1f2937",
                    color: "#f3f4f6",
                    fontSize: "14px",
                    padding: "15px 20px",
                    border: "1px solid #374151",
                },
            });
        } catch (err) {
            toast.error(err?.data?.msg, {
                style: {
                    background: "#1f2937",
                    color: "#f3f4f6",
                    fontSize: "14px",
                    padding: "15px 20px",
                    border: "1px solid #374151",
                },
            });
        }
    }

    const changeToCompleted = async (taskId) => {
        try {
            if (status === 'New' || status === 'Running') {
                const result = await changeStatus({ taskId, ctStatus: 'Completed' }).unwrap();
                toast.success(result?.msg, {
                    style: {
                        background: "#1f2937",
                        color: "#f3f4f6",
                        fontSize: "14px",
                        padding: "15px 20px",
                        border: "1px solid #374151",
                    },
                });
            }
        } catch (err) {
            toast.error(err?.data?.msg, {
                style: {
                    background: "#1f2937",
                    color: "#f3f4f6",
                    fontSize: "14px",
                    padding: "15px 20px",
                    border: "1px solid #374151",
                },
            });
        }
    }

    return (
        <div className='px-[10px] py-3 select-none hover:cursor-pointer'>
            <div className='flex items-center gap-4 justify-between hover:cursor-pointer text-gray-200 select-none'>
                {/* Task left container */}
                <div className='flex items-center gap-2'>
                    <div onClick={() => changeToCompleted(id)} className={`h-7 w-7 border border-gray-800 ${['New', 'Running'].includes(status) && 'active:bg-gray-700 active:border-gray-600'} hover:cursor-pointer grid place-items-center rounded-full transition-all`}>
                        <FontAwesomeIcon
                            icon={checkStatus ? status === 'Canceled' ? faXmarkCircle : faCircle : faCheckCircle}
                            className={`text-lg ${checkStatus ? status === 'Canceled' ? 'text-red-500' : '' : 'text-green-500'}`}
                        />
                    </div>
                    <p className={`text-[13px] ${status === 'Completed' && 'text-gray-500 line-through'}`}>{title}</p>
                </div>
                {/* Task right container */}
                <div className='flex items-center gap-3'>
                    {/* Task change status container */}
                    {
                        showStatus && (
                            <div className={`bg-gray-800 flex items-center gap-3 pl-5 statusAnim`}>
                                {
                                    allStatus.map((item, index) => {
                                        return (
                                            <div onClick={() => changeStatusHandler(id, item.name)} key={index} className={`h-6 w-6 active:scale-90 hover:scale-110 transition-all rounded-full grid place-content-center ${item.bg}`}>
                                                <div className={`${item.name === status && 'bg-gray-200'} h-2 w-2 rounded-3xl`}></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    <span onClick={() => setShowStatus(val => !val)} className={`
                        ${commonStyle} active:scale-90 transition-all
                        ${status === 'New' && 'bg-blue-400/10 text-blue-400 border-blue-400/20'}
                        ${status === 'Running' && 'bg-amber-400/10 text-amber-400 border-amber-400/20'}
                        ${status === 'Completed' && 'bg-green-400/10 text-green-400 border-green-400/20'}
                        ${status === 'Canceled' && 'bg-red-400/10 text-red-400 border-red-400/20'}
                    `}>{status}</span>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        onClick={() => setIsExpand(!isExpand)}
                        className={`text-sm duration-300 ${isExpand ? 'rotate-180' : 'rotate-0'} ${data?.opt?._iE && 'hidden'}`}
                    />
                </div>
            </div>
            {/* Task details container (label, priority, edit, delete etc) */}
            <div className={`duration-300 origin-top ${(data?.opt?._iE || isExpand) ? 'block' : 'hidden'}`}>
                <div className='bg-gray-900 rounded-lg border p-3 mt-3 border-gray-700 h-max flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <p className={`${commonStyle} bg-cyan-400/10 text-cyan-400 border-cyan-400/20`}>{label}</p>
                        <p className={`${commonStyle} bg-purple-400/10 text-purple-400 border-purple-400/20`}>{priority}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        {
                            !(status === 'Completed' || status === 'Canceled') && (
                                <button onClick={() => navigate(`/edit-task/${id}`)} className={`${commonStyle} active:scale-90 transition-all bg-lime-400/10 text-lime-400 border-lime-400/20`}>Edit</button>
                            )
                        }
                        <button onClick={() => {
                            setDeletePopup(true)
                            setClickTaskId(id);
                        }} className={`${commonStyle} active:scale-90 transition-all bg-red-400/10 text-red-400 border-red-400/20`}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
