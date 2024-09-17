import React, { useContext } from 'react'
import { DesignContext } from '../../context/DesignContext'

function SessionPopup() {
  const { sessionPopup } = useContext(DesignContext);
  const handleLogout = () => {
    localStorage.removeItem("_token");
    document.location = '/auth/login';
  }
  return (
    <div className='w-full z-20 h-screen fixed top-0 backdrop-blur-md select-none'>
      <div className={`max-w-96 overflow-hidden h-max border border-gray-700 rounded-xl bg-gray-800 mt-16 m-auto p-6 text-gray-200 ${sessionPopup ? 'scaleAnimShow' : ''}`}>
        <p className='text-sm font-semibold'>Session has been expired or token verification failed!</p>
        <button onClick={handleLogout} className='text-[13px] font-semibold bg-cyan-500 text-gray-900 py-2 px-6 rounded-full mt-5 float-end active:scale-95 transition-all'>Login again</button>
      </div>
    </div>
  )
}

export default SessionPopup;
