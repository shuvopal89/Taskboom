import React from 'react'

function ShowErrorMsg({errorMsg}) {
    return (
        <p className='text-[13px] font-medium mt-6 bg-red-500/10 border border-red-500/40 text-gray-200 py-3 rounded-lg text-center'>{errorMsg}</p>
    )
}

export default ShowErrorMsg;
