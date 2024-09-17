import React, { useContext, useState } from "react";
import { DesignContext } from "../../context/DesignContext";
import { ServerContext } from "../../context/ServerContext";
import { useChangeStatusMutation, useDeleteTaskMutation, useGetTasksAndLabelsQuery } from "../../services/taskApis";
import { allStatus } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDateFormatter } from "../../hooks/useDateFormatter";
import toast from "react-hot-toast";

const footerGenerator = (createdAt, status) => {
    if (useDateFormatter(new Date()) !== useDateFormatter(new Date(createdAt)) && status === 'New') {
        return "You didn't completed the task. (status - New)";
    } else if (useDateFormatter(new Date()) !== useDateFormatter(new Date(createdAt)) && status === 'Running') {
        return "You didn't completed the task. (status - Running)";
    } else if (useDateFormatter(new Date()) !== useDateFormatter(new Date(createdAt)) && status === 'Completed') {
        return "You completed the task.";
    } else if (useDateFormatter(new Date()) !== useDateFormatter(new Date(createdAt)) && status === 'Canceled') {
        return "You hadn't completed the task. (status - Canceled)";
    } else if (useDateFormatter(new Date()) === useDateFormatter(new Date(createdAt)) && status === 'New') {
        return "Added on today. (status - New)";
    } else if (useDateFormatter(new Date()) === useDateFormatter(new Date(createdAt)) && status === 'Running') {
        return "Added on today. (status - Running)";
    } else if (useDateFormatter(new Date()) === useDateFormatter(new Date(createdAt)) && status === 'Completed') {
        return "Added on today. (status - Completed)";
    } else if (useDateFormatter(new Date()) === useDateFormatter(new Date(createdAt)) && status === 'Canceled') {
        return "Added on today. (status - Canceled)";
    }
}

function ShowTaskPopup() {
    const { showTaskPopup, setShowTaskPopup } = useContext(DesignContext);
    const { clickSearchTaskId } = useContext(ServerContext);
    const handler = (e) => e.target.classList.contains("parent") && setShowTaskPopup(false);
    const { data } = useGetTasksAndLabelsQuery();
    const [deleteTask, { isLoading }] = useDeleteTaskMutation()
    const [changeStatus, { isLoading: loading }] = useChangeStatusMutation()


    const commonStyle = "text-[11px] px-3 py-[5px] border font-medium rounded-full";

    const task = data?.tasks?.find((task) => task?._id === clickSearchTaskId);

    const ShowTaskDeleteHandler = async () => {
        try {
            const result = await deleteTask(clickSearchTaskId).unwrap();
            toast.success(result?.msg, {
                style: {
                    background: "#1f2937",
                    color: "#f3f4f6",
                    fontSize: "14px",
                    padding: "15px 20px",
                    border: "1px solid #374151",
                },
            });
            setShowTaskPopup(false)
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

    const changeStatusHandler = async (taskId, ctStatus) => {
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
            setShowTaskPopup(false)
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
        <div className="w-full h-screen z-20 fixed top-0 parent bg-gray-900/70" onClick={handler}>
            <div className={`${showTaskPopup ? "scaleAnimShow" : ""} max-w-[550px] absolute -top-0 -bottom-0 -right-0 -left-0 m-auto h-max border rounded-xl border-gray-700 bg-gray-800 text-gray-200 divide-y divide-gray-700`}>

                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        {
                            task?.status === 'Completed' &&
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className="text-lg text-green-500"
                            />

                        }
                        {
                            loading && (
                                <div className="h-[12px] w-[12px] border-[1px] m-auto my-[2px] border-t-green-500 border-r-green-500 border-b-green-500 border-l-transparent animate-spin rounded-full"></div>
                            )
                        }
                    </div>
                    <div className={`bg-gray-800 flex items-center gap-3`}>
                        {
                            allStatus.map((item, index) => {
                                return (
                                    <div onClick={() => changeStatusHandler(clickSearchTaskId, item.name)} key={index} className={`h-6 w-6 active:scale-90 hover:scale-110 transition-all hover:cursor-pointer rounded-full grid place-content-center ${item.bg}`}>
                                        <div className={`${item.name === task?.status && 'bg-gray-200'} h-2 w-2 rounded-3xl`}></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                <div className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon
                                icon={faPen}
                                className="text-sm text-gray-500"
                            />
                            <p className="text-gray-200 text-[13px]">{task?.title}</p>
                        </div>
                        <p className='text-xs text-gray-400 flex-shrink-0'>{useDateFormatter(new Date(task?.createdAt))}</p>
                    </div>
                    <div className="flex items-center justify-between mt-16">
                        <div className="flex items-center gap-2">
                            <span className={`${commonStyle} bg-cyan-400/10 text-cyan-400 border-cyan-400/20`}>{task?.label}</span>
                            <span className={`${commonStyle} bg-purple-400/10 text-purple-400 border-purple-400/20`}>{task?.priority}</span>
                        </div>
                        <button onClick={ShowTaskDeleteHandler} className={`${commonStyle} active:scale-90 transition-all bg-red-400/10 text-red-400 w-[70px] border-red-400/20`}>
                            {
                                isLoading ? (
                                    <div className="h-[12px] w-[12px] border-[1px] m-auto my-[2px] border-t-red-400 border-r-red-400 border-b-red-400 border-l-transparent animate-spin rounded-full"></div>
                                ) : (
                                    <span>Delete</span>
                                )
                            }
                        </button>
                    </div>
                </div>

                <div className="p-5">
                    <p className="text-center text-[12px] font-medium text-gray-500">
                        {footerGenerator(task?.createdAt, task?.status)}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ShowTaskPopup;
