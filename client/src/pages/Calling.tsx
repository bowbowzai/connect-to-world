import React from 'react'
import { BsFillMicFill, BsFillCameraVideoFill } from "react-icons/bs"
import { ImPhoneHangUp } from "react-icons/im"
import { GrSend } from "react-icons/gr"
import MessageBox from '../components/MessageBox'

const Calling = () => {
  return (
    <div >
      <div className='flex w-screen h-screen '>
        <div className='flex-1 h-full'>
          <div className='relative bg-gray-300 h-[50%] w-full'>
            <video src="" className=''></video>
            <div className='absolute flex bottom-3 left-[50%] -translate-x-[50%] gap-2' >
              <div className='video-call-icons'>
                <BsFillMicFill />
              </div>
              <div className='video-call-icons'>
                <BsFillCameraVideoFill />
              </div>
              <div className='video-call-icons'>
                <ImPhoneHangUp />
              </div>
            </div>
          </div>
          <div className='relative bg-gray-300 h-[50%] w-full'>
            <video src="" className=''></video>
            <div className='absolute flex bottom-3 left-[50%] -translate-x-[50%] gap-2' >
              <div className='video-call-icons'>
                <BsFillMicFill />
              </div>
              <div className='video-call-icons'>
                <BsFillCameraVideoFill />
              </div>
              <div className='video-call-icons'>
                <ImPhoneHangUp />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between w-3/12 h-full'>
          <div>
            <MessageBox isReceive={true} />
            <MessageBox isReceive={false} />
          </div>
          {/* message input */}
          <div className='px-3 py-2'>
            <div className="relative">
              <input type="text" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none " placeholder="Send message here..." />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-xl hover:bg-gray-200 transition px-4 py-2">
                <GrSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calling