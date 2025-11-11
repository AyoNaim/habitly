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

interface TaskProps {
  emoji: string,
  title: string,
  time: string,
  frequency: string
}

export function TabCarousel({ emoji, title, time, frequency }: TaskProps) {
  
  const [isChecked, setisChecked] = React.useState(true);
  
  const handleCheckboxValue = (e: React.FormEvent) => {
    setisChecked(!isChecked)
  }

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <HabitsCard emoji="read" title="Read a book" time="08:00" frequency="3x a week" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-[-15px] w-12 h-12 border border-black" />
      <CarouselNext className="right-[-15px] w-12 h-12 border border-black" />
    </Carousel>
  )
}
