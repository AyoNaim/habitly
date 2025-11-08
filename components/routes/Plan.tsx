"use client"
import { useEffect, useState } from 'react';
import { GeistMono } from '@/lib/utils'
import { getDate, getGreeting } from '@/lib/utils'
import Toggle from '../Toggle';
import TaskList from '../TaskList';

interface DateProps {
  date: string;
  day: string;
  month: string;
}

export default function Plan() {
  const [selectedDay, setselectedDay] = useState<DateProps>({date: new Date().getDate().toString().padStart(2, "0"), day: new Date().getDay().toString(), month: new Date().getMonth().toString()});
  const [daysOfWeek, setDaysOfWeek] = useState<DateProps[]>([]);
  const [toggleView, setToggleView] = useState(true);
  const greeting = getGreeting();
  const date = getDate();

  useEffect(() => {
    const generateCurrentWeekdays = () => {
      const today = new Date();
      const currentDay = today.getDay(); // Sunday = 0, Monday = 1, etc.

      // Adjust this to make Monday the start of the week (if desired)
      const firstDayOfWeek = new Date(today);
      const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); 
      // if today is Sunday (0), go back 6 days, otherwise go back to Monday

      firstDayOfWeek.setDate(diff);

      const days: DateProps[] = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(firstDayOfWeek);
        currentDate.setDate(firstDayOfWeek.getDate() + i);

        const formattedDate = currentDate.getDate().toString().padStart(2, '0');
        const dayName = currentDate.toLocaleString('default', { weekday: 'long' });
        const monthName = currentDate.toLocaleString('default', { month: 'long' });

        days.push({
          date: formattedDate,
          day: dayName,
          month: monthName,
        });
      }

      setDaysOfWeek(days);
    };

    generateCurrentWeekdays();
  }, []);



return (
  <div className="w-screen h-screen flex justify-center items-center">
    <div className="w-11/12 h-11/12 flex flex-col gap-7">
      {/* Navbar */}
      <div className="h-16 w-full flex justify-between">
        <div className="flex flex-col justify-between">
          <div className={`text-2xl font-semibold ${GeistMono.className}`}>
            {greeting}, Ayo
          </div>
          <div className={`text-sm ${GeistMono.className}`}>{date}</div>
        </div>
        <div className="w-17 h-full flex justify-center items-center">
          <img src={"/profile.svg"} alt="profile" className="w-full h-full" />
        </div>
      </div>

      {/* Date Picker */}
      <div className="w-full h-10 flex justify-center items-center gap-3">
        {daysOfWeek.map((day) => (
          <div
            key={day.date}
            className={`cursor-pointer flex justify-center items-center flex-col gap-1 rounded-md w-11 h-13 ${
              day.date === selectedDay.date
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setselectedDay(day)}
          >
            <p className="text-sm">{day.date}</p>
            <p className="text-sm">{day.day.slice(0, 3)}</p>
          </div>
        ))}
      </div>

      {/* Toggle Tabs */}
      <div className="mt-5 relative flex justify-center items-center">
        <div className="relative w-full h-full">

          {/* Keep both components in place to prevent layout jump */}

          <div
            className={`transition-all duration-500 ${
              toggleView
                ? "flex opacity-100 z-10 pointer-events-auto"
                : "hidden opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Toggle />
          </div>
          <div
            className={`transition-all duration-500 justify-center items-center ${
              toggleView
                ? "hidden opacity-0 z-0 pointer-events-none"
                : "flex opacity-100 z-10 pointer-events-auto"
            }`}
          >
            <TaskList />
          </div>


          {/* Redesigned Toggle Button */}
          <div className="absolute right-6 top-6">
            <div className="flex bg-gray-100 rounded-full shadow-sm border border-gray-300 overflow-hidden">
              {/* Carousel View */}
              <button
                onClick={() => setToggleView(true)}
                className={`flex items-center justify-center w-10 h-10 transition-all ${
                  toggleView
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-500"
                }`}
                aria-label="Carousel View"
              >
                <img
                  src="/horizontal.svg"
                  alt="carousel"
                  className={`w-5 h-5 transition-all ${
                    toggleView ? "invert" : "invert-0"
                  }`}
                />
              </button>

              {/* List View */}
              <button
                onClick={() => setToggleView(false)}
                className={`flex items-center justify-center w-10 h-10 transition-all ${
                  !toggleView
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-500"
                }`}
                aria-label="List View"
              >
                <img
                  src="/vertical.svg"
                  alt="list"
                  className={`w-5 h-5 transition-all ${
                    !toggleView ? "invert" : "invert-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}