import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface TaskProps {
    emoji: string,
    title: string,
    time: string,
    frequency: string
}

export default function HabitsCard ({emoji, title, time, frequency}: TaskProps) {
  
  const [isChecked, setisChecked] = React.useState(true);
  
  const handleCheckboxValue = (e: React.FormEvent) => {
    setisChecked(!isChecked)
  }

    return (
        <Card>
            <CardContent className="flex aspect-square items-center justify-center p-5">
                <div className="w-full h-full flex flex-col">
                <div className='flex justify-between w-full h-1/6'>
                    <div className='flex flex-col justify-between'>
                    <p className={`font-semibold ${isChecked ? 'line-through' : ''}`}>{title}</p>
                    <p className='text-sm'>{frequency}</p>
                    </div>
                    <div>{time}</div>
                </div>
                <div className='w-full h-4/6 flex justify-center items-center'>
                    <img src={`./${emoji}.svg`} alt='read' />
                </div>
                <div className='w-full h-1/6 flex justify-between mt-5'>
                    <p className="font-semibold">{`${isChecked ? 'completed' : 'Mark as complete'}`}</p>
                    <input type="checkbox" className="checkbox checkbox-primary" checked={isChecked} onChange={handleCheckboxValue} />
                </div>
                </div>
            </CardContent>
        </Card>
    )
}