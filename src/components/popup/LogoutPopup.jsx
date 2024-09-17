import React, { useContext } from 'react'
import { DesignContext } from '../../context/DesignContext'

function DashboardAccountPopup() {
  const { logoutPopup } = useContext(DesignContext)
  return (
    <div className='w-full z-20 h-screen fixed top-0 bg-gray-900/70 select-none'>
      <div className={`max-w-72 h-max border border-gray-700 rounded-xl bg-gray-800 mt-16 m-auto p-6 text-gray-200 flex items-center gap-4 ${logoutPopup ? 'scaleAnimShow' : ''}`}>
        <div className='h-5 w-5 border-[2.8px] border-t-green-500 border-r-green-500 border-b-green-500 border-l-transparent animate-spin rounded-full'></div>
        <p className='text-[13px] font-normal'>Logging out.....</p>
      </div>
    </div>
  )
}

export default DashboardAccountPopup
