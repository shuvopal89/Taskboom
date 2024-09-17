import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'
import { ServerContext } from '../context/ServerContext';

function MenuNavigationItem({ icon, title, link }) {
    const { setDate } = useContext(ServerContext);
    const path = useLocation().pathname;
    return (
        <Link to={link} onClick={() => setDate(new Date())} className={`flex items-center max-lg:justify-center gap-3 p-3 px-4 max-lg:px-3 max-lg:rounded-lg text-gray-200 border bg-gradient-to-r ${link === path ? 'from-gray-800 to-gray-900 border-gray-800' : 'border-gray-900'} transition-all rounded-full hover:from-gray-800 hover:to-gray-900 hover:border-gray-800 group active:opacity-60`}>
            <FontAwesomeIcon
                icon={icon}
                className='text-xl text-gray-200 group-hover:scale-110 transition-all'
            />
            <p className='text-sm max-lg:hidden'>{title}</p>
        </Link>
    )
}

export default MenuNavigationItem
