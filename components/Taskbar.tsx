import React, { useState } from 'react'
import { Input } from './ui/input'

interface TaskProps {
  emoji: string,
  title: string,
  time: string,
  frequency: string
}

const Taskbar = ({ emoji, title, time, frequency }: TaskProps) => {
  const [isChecked, setisChecked] = useState(true);
  
  const handleCheckboxValue = (e: React.FormEvent) => {
    setisChecked(!isChecked)
  }

  return (
    <div className='w-full h-15 rounded-md flex justify-center items-center'>
      <div className='w-11/12 h-10/12 flex justify-between items-center'>
        <div className='h-full w-2/12 flex justify-center items-center'>
          <div className='w-10/12 h-10/12 bg-gray-100 rounded-md flex justify-center items-center'>
            {/* <div className='w-8/12 h-8/12'>
              <img src='./read.svg' alt='activity'  />
            </div> */}
          </div>
        </div>
        <div className='flex justify-center items-center h-full w-8/12'>
          <div className='h-10/12 w-10/12 flex flex-col justify-between'>
            <p className={`text-sm font-semibold ${isChecked ? 'line-through' : ''}`}>{title}</p>
            <div className='flex gap-4'>
              <p className='text-sm flex gap-2'><img src={'./clock.svg'} alt='time' width={12} height={12} />{time}</p>
              <p className='text-sm'>{frequency}</p>
            </div>
          </div>
        </div>
        <div className='h-full w-2/12 flex justify-center items-center'>
            <input type="checkbox" className="checkbox checkbox-primary" checked={isChecked} onChange={handleCheckboxValue} />
        </div>
      </div>
    </div>
  )
}

export default Taskbar
