import React from 'react'
import { GeistMono } from '@/lib/utils'
import Taskbar from './Taskbar'
import { ScrollArea } from './ui/scroll-area'

export default function TaskList() {
    return (
        <div className='w-90 h-100 flex justify-center items-center'>
            <div className='flex flex-col w-11/12 h-11/12 gap-3'>
                <p className={`${GeistMono.className} text-2xl text-center font-semibold`}>Your habits, routine <br /> redefined </p>
                <div className='flex flex-col w-full gap-3 max-h-[400px] overflow-y-auto rounded-md'>
                    <ScrollArea className='h-full'>
                        <div className='flex flex-col gap-4'>
                            <Taskbar emoji='meditation' title='meditation' time='09:00' frequency='2x a week'/>
                            <Taskbar emoji='Read a book' title='reading' time='08:00' frequency='3x a week'/>
                            <Taskbar emoji='take a walk' title='walk' time='10:00' frequency='5x a week'/>
                            <Taskbar emoji='hit the gym' title='gym' time=':00' frequency='2x a week'/>
                            <Taskbar emoji='learn spanish' title='spanish' time='01:00' frequency='4x a week'/>
                            <Taskbar emoji='prepare dinner' title='dinner' time='05:00' frequency='7x a week'/>
                            <Taskbar emoji='play football' title='football' time='07:00' frequency='6x a week'/>
                            <Taskbar emoji='practice piano' title='piano' time='09:00' frequency='3x a week'/>
                        </div>
                    </ScrollArea>                    
                </div>
            </div>
        </div>
    )
}