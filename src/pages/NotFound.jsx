import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='w-full h-screen bg-gray-900'>
      <div className='max-w-[500px] absolute -top-0 -bottom-0 -left-0 -right-0 m-auto flex flex-col items-center justify-center'>
        <img src="404.png" alt="notfound" />
        <h2 className='text-2xl font-semibold text-gray-300 mt-8'>Content isn't Available</h2>
        <p className='text-gray-600 text-[13px] text-center mt-3 font-medium'>A "404 Not Found" error occurs when the server can't find the requested page or resource. This typically happens when a URL is incorrect, the content has been moved, or it no longer exists.</p>
        <Link className='text-sm text-gray-900 bg-red-500 font-bold py-[10px] px-6 rounded-full mt-6 hover:bg-red-400 transition-all' to={'/'}>Go to dashboard</Link>
      </div>
    </div>
  )
}

export default NotFound
