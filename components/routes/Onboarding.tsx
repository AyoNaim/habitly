'use client'
import { habits } from '@/lib'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { GeistMono } from '@/lib/utils'
import { Input } from '../ui/input'

const FREQUENCIES = ['daily', 'every two days', 'once a week', 'twice a week']

const Onboarding = () => {
  const [toggleInput, setToggleInput] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState('')
  const [habitDuration, setHabitDuration] = useState('')

  const handleHabitSelect = (habitName: string, defaultDuration: string) => {
    setSelectedHabit(habitName)
    setHabitDuration(defaultDuration || '')
  }

  const handleCustomSubmit = () => {
    if (!selectedHabit || !habitDuration) return
    alert(`Custom habit: ${selectedHabit}, Frequency: ${habitDuration}`)
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='w-11/12 h-5/6 flex justify-between items-center'>
        
        {/* Left illustration */}
        <div className='w-1/3 h-full flex justify-center items-center mb-16'>
          <img src={'./blob.svg'} alt='blob' width={270} height={270} className='absolute' />
          <img src={'./walk.svg'} alt='habit' width={170} height={170} className='absolute' />
        </div>

        {/* Main content */}
        <div className='flex flex-col gap-10 items-center w-2/3 h-full'>
          <p className={`text-2xl md:text-3xl text-wrap text-center tracking-tighter mt-3 w-2/3 ${GeistMono.className}`}>
            What habits do you want to develop or drop?
          </p>

          {/* Habit selection grid */}
          <div className='grid grid-cols-2 grid-rows-2 gap-3'>
            {habits.map((habit) => (
              <div
                key={habit.name}
                onClick={() => handleHabitSelect(habit.name, habit.duration)}
                className={`flex justify-center items-center cursor-pointer ${habit.className} ${
                  selectedHabit === habit.name
                    ? 'border border-blue-500 border-2 shadow-md'
                    : 'border-none'
                }`}
              >
                <p className={`${GeistMono.className} text-[9px] md:text-[14px] tracking-tighter`}>
                  {habit.name}
                </p>
              </div>
            ))}
          </div>

          {/* Frequency selection */}
          <div className="relative w-full flex justify-center">
            {selectedHabit && (
              <>
                {/* BACKDROP OVERLAY */}
                <div
                  className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
                  onClick={() => setSelectedHabit('')}
                />

                {/* FLOATING FREQUENCY PANEL */}
                <div
                  className="absolute bottom-[-120px] bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg flex flex-col items-center gap-4 border border-gray-200 w-fit z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className={`text-md ${GeistMono.className}`}>
                    How often do you want to do this?
                  </p>

                  {/* FREQUENCY BUTTONS */}
                  <div className="flex gap-3 flex-wrap justify-center">
                    {FREQUENCIES.map((freq) => (
                      <Button
                        key={freq}
                        onClick={() => setHabitDuration(freq)}
                        variant={habitDuration === freq ? 'default' : 'secondary'}
                        className={`rounded-3xl px-4 py-2 text-sm ${GeistMono.className}`}
                      >
                        {freq}
                      </Button>
                    ))}
                  </div>

                  {/* ✅ SUBMIT BUTTON DIV (shows only if duration is chosen) */}
                  {habitDuration && (
                    <div
                      onClick={() => handleCustomSubmit()}
                      className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full cursor-pointer flex justify-center items-center shadow-md"
                    >
                      <img src={'./send.svg'} alt='send' width={20} height={20} />
                    </div>
                  )}
                </div>
              </>
            )}

          </div>


          {/* Custom habit input */}
          <div className='mt-5'>
            {toggleInput ? (
              <div className='flex flex-col gap-4 items-center'>
                <Input
                  name='habit'
                  placeholder='Enter your own habit'
                  value={selectedHabit}
                  onChange={(e) => setSelectedHabit(e.target.value)}
                  className={`border-0 border-b rounded-none w-64 focus:outline-none ${GeistMono.className}`}
                />
                <select
                  className='border border-gray-300 rounded-md px-2 py-1'
                  value={habitDuration}
                  onChange={(e) => setHabitDuration(e.target.value)}
                >
                  <option value=''>Select frequency</option>
                  {FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleCustomSubmit}
                  className={`bg-green-500 text-white px-5 py-2 rounded-3xl ${GeistMono.className}`}
                >
                  Save Habit
                </Button>
              </div>
            ) : (
              <Button
                variant={'secondary'}
                size={'lg'}
                onClick={() => setToggleInput(!toggleInput)}
                className={`h-12 md:h-14 rounded-5xl text-md md:text-xl font-medium tracking-tight cursor-pointer bg-green-400 ${GeistMono.className}`}
              >
                Enter your own custom habit
              </Button>
            )}
          </div>

          {/* Final preview */}
          {(selectedHabit && habitDuration) && (
            <p className={`${GeistMono.className} text-lg text-center mt-4`}>
              You selected: <span className='font-semibold'>{selectedHabit}</span> —{' '}
              <span className='italic'>{habitDuration}</span>
            </p>
          )}
        </div>

        {/* Right illustration */}
        <div className='w-1/3 h-full flex justify-center items-center mb-16'>
          <img src={'./habitblob.svg'} alt='blob' width={270} height={270} className='absolute' />
          <img src={'./habits.svg'} alt='habit' width={180} height={180} className='absolute' />
        </div>
      </div>
    </div>
  )
}

export default Onboarding
