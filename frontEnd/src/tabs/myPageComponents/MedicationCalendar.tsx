import React from 'react';
import { View, Text } from 'react-native';
import calendarStyles from './Styles/calendarStyles';

interface MedicationCalendarProps {
  medicationData: [number, number][];
}

// Helper function to get circle color based on medication count
const getCircleColor = (count: number) => {
  if (count === 3) return '#9C98E7'; // High
  if (count === 2) return '#BAB7EE'; // Medium
  if (count === 1) return '#D7D6F5'; // Low
  if (count === 0) return '#F5F5FD'; // No medication
  return '#D9D9D9'; // Grey for missing data
};

// Function to generate a two-week calendar based on provided data
const generateTwoWeekData = (medicationData: [number, number][]) => {
  const dates: { date: Date; day: number; count: number }[] = [];

  // First, populate with the provided sample data in its exact order
  medicationData.forEach(([day, count]) => {
    const date = new Date();
    date.setDate(day); // Set day based on medicationData
    dates.push({ date, day, count });
  });

  // Calculate how many additional days are needed to make it a 14-day calendar
  const daysNeeded = 14 - dates.length;

  // Append missing days with count -1 (for grey circle)
  for (let i = 0; i < daysNeeded; i++) {
    const nextDate = new Date(dates[dates.length - 1].date);
    nextDate.setDate(nextDate.getDate() + 1); // Continue from last date
    dates.push({ date: nextDate, day: nextDate.getDate(), count: -1 });
  }

  return dates;
};

const MedicationCalendar: React.FC<MedicationCalendarProps> = ({ medicationData }) => {
  const dates = generateTwoWeekData(medicationData);

  // Determine the "last data" day as "today" by selecting the last element
  const lastDataDay = medicationData[medicationData.length - 1][0];

  // Days of the week labels
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View>
      {/* White background box containing week labels and calendar grid */}
      <View style={calendarStyles.calendarContainer}>
        {/* Days of the week labels */}
        <View style={calendarStyles.weekHeader}>
          {dayLabels.map((label, index) => (
            <Text key={index} style={calendarStyles.dayLabel}>
              {label}
            </Text>
          ))}
        </View>
  
        {/* Calendar grid with date circles */}
        <View style={calendarStyles.calendarGrid}>
          {dates.map((day, index) => (
            <View
              key={index}
              style={day.day === lastDataDay ? calendarStyles.todayBox : calendarStyles.dayContainer}
            >
              <Text style={day.day === lastDataDay ? calendarStyles.todayText : calendarStyles.dayText}>
                {day.day}
              </Text>
              <View
                style={[
                  calendarStyles.circle,
                  { backgroundColor: getCircleColor(day.count) },
                ]}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MedicationCalendar;