import React from 'react'

interface MessageBoxProp {
  isReceive: boolean;
}

const MessageBox = ({ isReceive }: MessageBoxProp) => {
  return (
    <div className='px-2'>
      <div className={`px-2 py-2 flex items-end  gap-3 ${isReceive ? " justify-start" : " flex-row-reverse justify-start"}`}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" className='h-10 w-10 rounded-full' />
        <div className={` px-3 py-1 rounded-lg  ${isReceive ? "bg-blue-300 rounded-bl-none" : "bg-purple-300 rounded-br-none"}`}>halo</div>
      </div >
    </div >
  )
}

export default MessageBox