"use client"
import React, { useState, useEffect } from 'react';

const WeekdaysCalendar = () => {
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  useEffect(() => {
    const generateWeekdays = () => {
      const today = new Date();
      const month = today.toLocaleString('default', { month: 'long' }); // Current month
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
      const firstDayIndex = firstDayOfMonth.getDay(); // Get the day index (0-6)

      let days = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(firstDayOfMonth);
        currentDay.setDate(currentDay.getDate() + i); // Increment day

        // Format the date (DD) and get the name of the day
        const formattedDate = currentDay.getDate().toString().padStart(2, '0');
        const dayName = currentDay.toLocaleString('default', { weekday: 'long' });

        days.push({
          date: formattedDate,
          day: dayName,
          Month: month,
        });
      }

      setDaysOfWeek(days);
    };

    generateWeekdays();
  }, []);

  return (
    <div>
      <h2>Weekdays of the Month</h2>
      <ul>
        {daysOfWeek.map((day, index) => (
          <li key={index}>
            {day.day}, {day.date} {day.Month}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekdaysCalendar;
