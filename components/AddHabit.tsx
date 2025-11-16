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
import React, { useState } from "react"

interface HabitProps {
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddHabit({ open, onOpenChange }: HabitProps) {
  const [title, setTitle] = useState('');
  const [timezone, setTimezone] = useState('');
  const [frequency, setFrequency] = useState('');
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
      return;
    }

    const habit = await res.json();
    console.log("Habit created:", habit);

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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Habit</DialogTitle>
          </DialogHeader>

          <DialogDescription>

          </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="frequency">Frequency</Label>
              <Input id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">{loading ? 'saving...' : 'Save changes'}</Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  );
}
