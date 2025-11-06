import { clsx, type ClassValue } from "clsx"
import { Geist_Mono } from "next/font/google"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GeistMono = Geist_Mono({ subsets: ['latin'] })

export const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening"
}

export const getDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  })
}