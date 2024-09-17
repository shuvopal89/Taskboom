import React from 'react'

function LabelSkeleton() {
    const commonStyle = "w-full bg-gray-800 rounded-xl p-9 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-shimmer";

    return (
        <div className='p-3 grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2'>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
            <div className={`${commonStyle}`}></div>
        </div>
    )
}

export default LabelSkeleton
