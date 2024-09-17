import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'

function BottomTab({ icon, link }) {
    const path = useLocation().pathname;
    return (
        <Link to={link} className={`grid place-items-center border bg-gradient-to-r ${link === path ? 'from-gray-800 to-gray-900 border-gray-800' : 'border-gray-900'} h-10 w-10 rounded-lg`}>
            <FontAwesomeIcon
                icon={icon}
                className='text-xl text-gray-200'
            />
        </Link>
    )
}

export default BottomTab
