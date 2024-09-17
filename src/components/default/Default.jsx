import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Default({ icon, title, desc }) {
    return (
        <div className='grid place-content-center place-items-center gap-3 h-96'>
            <div className='h-16 w-16 border-2 border-gray-700 flex items-center justify-center rounded-full'>
                <FontAwesomeIcon
                    icon={icon}
                    className='text-2xl text-gray-700'
                />
            </div>
            <p className='text-3xl font-extrabold text-gray-400 mt-2'>{title}</p>
            <p className='text-[13px] w-96 font-normal text-gray-500 text-center'>{desc}</p>
        </div>
    )
}

export default Default
