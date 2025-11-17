import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GeistMono } from "@/lib/utils"
import React, { useState } from "react"

interface HabitProps {
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddHabit({ open, onOpenChange }: HabitProps) {
  const FREQUENCIES = ['daily', 'every two days', 'once a week', 'twice a week']

  const [title, setTitle] = useState('learn spanish');
  const [timezone, setTimezone] = useState('UTC');
  const [frequency, setFrequency] = useState('daily');
  const [loading, setloading] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setloading(true);

    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, timezone, frequency }),
    });

    if (!res.ok) {
      alert("Error adding habit");
      setloading(false);
      return;
    }

    const habit = await res.json();
    console.log("Habit created:", habit);
    alert("added habit successfully!")
    setloading(false)
    // Optional: close modal after saving
    onOpenChange(false);

    // Optional: clear fields
    setTitle("");
    setTimezone("");
    setFrequency("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className={`text-center text-3xl ${GeistMono.className}`}>New Habit</DialogTitle>
          </DialogHeader>

          <DialogDescription>

          </DialogDescription>
          <form>
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-3 justify-between items-center w-full">
                <div className='grid gap-2 w-9/12'>
                  <label htmlFor='habit text-sm'>habit</label>
                  <Input name='habit' placeholder='enter your habit' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='grid gap-2 w-9/12'>
                  <label htmlFor='timezone text-sm'>timezone</label>
                  <Input name='timezone' placeholder='enter your time zone' value={timezone} onChange={(e) => setTimezone(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-5 w-10/12'>
                  <p className={`text-md text-center ${GeistMono.className}`}>
                    How often do you want to do this?
                  </p>
                  
                  <div className="flex gap-3 flex-wrap justify-center">
                    {
                      FREQUENCIES.map((freq) => (
                        <Button
                          key={freq}
                          // onClick={() => setFrequency(freq)}
                          variant={frequency === freq ? 'default' : 'secondary'}
                          className={`rounded-3xl px-4 py-2 text-sm ${GeistMono.className}`}
                        >
                            {freq}
                          </Button>
                      ))
                    }
                  </div>

                  <div className='flex flex-col gap-2'>
                    <p className={`${GeistMono.className}`}>Illustration selection</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
    </Dialog>
  );
}
