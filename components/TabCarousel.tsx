import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import HabitsCard from "./HabitsCard";
import { EditHabit } from "./EditHabit";
import { DialogDemo } from "./test"

interface TaskProps {
  emoji: string,
  title: string,
  time: string,
  frequency: string
}

export function TabCarousel({ emoji, title, time, frequency }: TaskProps) {
  
  const [isChecked, setisChecked] = React.useState(true);
  const [isOpen, setisOpen] = React.useState(false);
  const [selectedHabit, setselectedHabit] = React.useState(null)

  const handleCheckboxValue = (e: React.FormEvent) => {
    setisChecked(!isChecked)
  }


  
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((habit: any, index) => (
          <CarouselItem key={index}>
            <div 
              className="p-1" 
              onClick={() => {
                setselectedHabit(habit)
                setisOpen(true)
              }}
            >
              <HabitsCard emoji="read" title="Read a book" time="08:00" frequency="3x a week"/>
            </div>
            <EditHabit open={isOpen} onOpenChange={setisOpen} habitId="963ec8f9-f30f-4002-b7f9-6fa2e0f0c703" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-[-15px] w-12 h-12 border border-black" />
      <CarouselNext className="right-[-15px] w-12 h-12 border border-black" />
    </Carousel>
  )
}
