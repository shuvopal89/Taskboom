import React from 'react'

function CreateButton({ title, width, handler, isLoading }) {
    return (
        <div className='flex justify-end'>
            <div onClick={handler} className={`select-none h-8 hover:cursor-pointer text-[13px] font-medium hover:bg-green-600 active:scale-95 transition-all bg-green-500 grid place-items-center text-gray-900 medium ${width} rounded-full`}>
                {
                    isLoading ? (
                        <div className="h-[15px] w-[15px] border-[2px] border-l-transparent border-t-gray-950  border-r-gray-950 border-b-gray-950 animate-spin rounded-full"></div>
                    ) : (
                        <span>{title}</span>
                    )
                }
            </div>
        </div>
    )
}

export default CreateButton
