import React from 'react'

function DashboardSkeleton() {
    const commonStyle = "w-full bg-gray-800 rounded-xl p-14 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-shimmer";

    return (
        <div className='p-3 grid gap-3 grid-cols-3 max-md:grid-cols-2 grid-rows-5 max-md:grid-rows-9'>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle} row-span-3 max-md:col-span-2`}></div>
            <div className={`${commonStyle} row-span-3 col-span-2`}></div>
        </div>
    )
}

export default DashboardSkeleton
