import React from 'react'

function Overview({ title, number, today }) {
  return (
    <div className='w-full border border-b-[6px] bg-gradient-to-t from-gray-900 to-gray-800 border-gray-800 p-4 rounded-xl'>
      <p className='text-xs font-medium text-gray-500'>{title}</p>
      <div className='flex items-center justify-between gap-2 mt-6'>
        <h3 className='text-xl font-medium text-gray-200'>{number}</h3>
        <span className='text-xs text-green-500 font-medium'>{today}</span>
      </div>
    </div>
  )
}

export default Overview
