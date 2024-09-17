import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons'

function CreateTaskOption({ id, title, data, label, priority, status, task, setTask }) {

    const setOptionHandler = (title) => {
        switch (id) {
            case 1:
                setTask({ ...task, label: title });
                break;
            case 2:
                setTask({ ...task, priority: title });
                break;
            default:
                setTask({ ...task, status: title });
        }
    }

    return (
        <div className='w-full bg-gray-800 rounded-xl p-4 border border-gray-700 text-gray-200 select-none'>
            <p className='text-sm font-normal'>{title}</p>
            <div className='bg-gray-900 max-h-72 overflow-y-scroll mt-3 rounded-xl py-2 hideScrollbar'>
                {
                    data?.map((item, index) => {
                        return (
                            <div onClick={() => setOptionHandler(item.name)} key={index} className='flex items-center justify-between px-3 py-[10px] hover:bg-gray-700/20 hover:cursor-pointer'>
                                <p className='text-[13px] font-normal'>{item.name}</p>
                                <FontAwesomeIcon
                                    icon={item.name === label || item.name === priority || item.name === status ? faCircleDot : faCircle}
                                    className={`text-lg ${item.name === label || item.name === priority || item.name === status ?
                                        `${id === 1 ? 'text-cyan-500' :
                                            id === 2 ? 'text-purple-500' : 'text-green-500'
                                        }`
                                        : ''}`}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateTaskOption
