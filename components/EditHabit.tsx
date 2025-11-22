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
import { supabase } from "@/lib/supabase"
import { GeistMono } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { toast } from "sonner"

interface HabitProps {
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
    habitId: string,
    initialData?: {
      title: string,
      timezone: string,
      frequency: string,
      imageUrl: string | null
    }
}

export function EditHabit({ open, onOpenChange, initialData, habitId='' }: HabitProps) {
  const FREQUENCIES = ['daily', 'every two days', 'once a week', 'twice a week']

  const [title, setTitle] = useState(initialData?.title || '');
  const [timezone, setTimezone] = useState(initialData?.timezone || 'UTC');
  const [frequency, setFrequency] = useState(initialData?.frequency || 'daily');
  const [loading, setloading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.imageUrl|| null);

  // const fileInputRef = useRef<HTMLInputElement | null >(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setloading(true);

    const res = await fetch('/api/editHabit', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({habitId, title, timezone, frequency, imageUrl }),
    });

    if (!res.ok) {
      toast.error("Error updating habit");
      setloading(false);
      return;
    }

    const habit = await res.json();
    console.log("Habit updated:", habit);
    toast.success("habit updated successfully!");
    // alert("added habit successfully!")
    setloading(false)
    // Optional: close modal after saving
    // onOpenChange(false);

    // Optional: clear fields
    setTitle("");
    setTimezone("");
    setFrequency("");
  }


  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`
    
    console.log("Selected file:", file);

    const { data, error } = await supabase.storage.from('habit-images').upload(fileName, file);
    
    if (error) {
      console.error('Upload error', error);
      return;
    }

    console.log('File uploaded successfully', data);
    toast.success('Image uploaded successfully!')

    const publicUrl = await supabase.storage.from('habit-images').getPublicUrl(fileName);
    
    setImageUrl(publicUrl.data.publicUrl)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className={`text-center text-3xl ${GeistMono.className}`}>Edit Habit</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-3 justify-between items-center w-full">
                <div className='grid gap-2 w-10/12'>
                  <label htmlFor='habit' className={`text-sm font-semibold ${GeistMono.className}`}>habit</label>
                  <Input name='habit' placeholder='enter your habit' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='grid gap-2 w-10/12'>
                  <label htmlFor='timezone' className={`text-sm font-semibold ${GeistMono.className}`}>timezone</label>
                  <Input name='timezone' placeholder='enter your time zone' value={timezone} onChange={(e) => setTimezone(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-5 w-10/12'>
                  <p className={`text-sm font-semibold text-center ${GeistMono.className}`}>
                    How often do you want to do this?
                  </p>
                  
                  <div className="flex gap-3 flex-wrap justify-center">
                    {
                      FREQUENCIES.map((freq) => (
                        <Button
                          key={freq}
                          onClick={() => setFrequency(freq)}
                          variant={frequency === freq ? 'default' : 'secondary'}
                          className={`rounded-3xl px-4 py-2 text-sm ${GeistMono.className}`}
                          type="button"
                        >
                            {freq}
                          </Button>
                      ))
                    }
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <p className={`${GeistMono.className} text-sm font-semibold`}>Illustration selection</p>
                    <p className={`${GeistMono.className} text-[11px]`}>select an image that best suits your habit</p>
                    <div className="flex justify-between">
                      {Array.from({length: 3}).map((_, index) => (
                        <div key={index} className="w-20 h-20 bg-red-500 rounded-md cursor-pointer">
                          <img src={'./read.svg'} alt="read" />
                        </div>
                      ))}
                      <div className="w-20 h-20 bg-red-500 rounded-md flex justify-center items-center cursor-pointer">
                        <Input type='file' accept='image/*' className="" onChange={handleFileInput} />
                        {/* <img src={'./plus.svg'} alt="read" className="w-1/3 h-1/3" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <DialogFooter className="mt-1.5">
            <Button type="submit" className="cursor-pointer" disabled={loading}>{loading ? 'Saving' : 'Update Habit'}</Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  );
}
