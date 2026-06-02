import React from 'react'

const ErrorOverlay = ({message}) => {
  return (
    <>
        <div
        className={`flex bg-red-600 p-2 px-4 rounded-4xl absolute right-10 gap-3`}>
            <i className='bi bi-exclamation-circle-fill text-white'/>
            <div className='text-white font-[JetBrains_Mono] font-bold'>{message}</div>
        </div>
    </>
  )
}

export default ErrorOverlay
