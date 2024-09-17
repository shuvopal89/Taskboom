import React, { useContext } from 'react';
import { useDateFormatter } from '../hooks/useDateFormatter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ServerContext } from '../context/ServerContext';
import HeaderIcon from '../components/HeaderIcon'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

function TaskCommonHeader({ label }) {
    const { date, setDate } = useContext(ServerContext);

    return (
        <div className='flex w-full justify-between items-center select-none'>
            <div className='flex items-center gap-2 max-md:flex-col max-md:gap-[2px] max-md:items-start'>
                <h3 className='text-lg font-medium text-gray-200'>{label}</h3>
                <p className='text-xs font-medium text-gray-500'>{`(${useDateFormatter(new Date(date))})`}</p>
            </div>
            <div className='flex items-center gap-4'>
                {
                    useDateFormatter(new Date()) !== useDateFormatter(new Date(date)) && (
                        <FontAwesomeIcon
                            icon={faXmark}
                            className='text-lg text-gray-400 hover:cursor-pointer max-md:hidden'
                            onClick={() => setDate(new Date())}
                        />
                    )
                }
                <input type="date" id='date' className='text-gray-200 border bg-gray-900 border-gray-800 rounded-full text-sm px-3 py-2 max-md:hidden' onChange={(e) => setDate(e.target.value)} value={date} />
                {
                    !(label === 'Regular' || label === 'TODAY') && <HeaderIcon icon={faTrash} id={3} label={label} />
                }
            </div>
        </div>
    )
}

export default TaskCommonHeader
