import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function Label({title}) {
  return (
    <Link to={`/labels/${title}`} className='w-full p-4 rounded-xl bg-gray-800 text-gray-200 flex items-center gap-4 hover:cursor-pointer hover:opacity-80 active:scale-95 transition-all border border-gray-700'>
      <FontAwesomeIcon
        icon={faTag}
        className='text-lg'
      />
      <p className='text-[13px] font-medium '>{title}</p>
    </Link>
  )
}

export default Label
