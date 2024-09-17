import React from 'react'

function TaskSkeleton() {
    const commonStyle = "w-full bg-gray-800 p-9 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-shimmer";

    return (
        <div className='p-3 grid grid-cols-1 gap-[1px]'>
            <div className={`${commonStyle} rounded-t-xl`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle} rounded-b-xl`}></div>
        </div>
    )
}

export default TaskSkeleton
