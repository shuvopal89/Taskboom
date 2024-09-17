import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
    return (
        <Link to={"/"} className='flex items-center gap-3 p-5 max-md:p-0'>
            <img className='w-6 h-6 flex-shrink-0' src="/logo.png" alt="" />
            <h2 className={`text-2xl text-gray-200 max-lg:hidden max-md:block font-lobster`}>Taskboom</h2>
        </Link>
    )
}

export default Logo
