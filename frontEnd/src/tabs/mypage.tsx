import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import styles from './myPageComponents/Styles/trackerStyles';
import MedicationCalendar from './myPageComponents/MedicationCalendar';
import ProgressBar from './myPageComponents/ProgressBar';
import Statistics from './myPageComponents/Statistics';
import UserGreeting from './myPageComponents/UserGreeting';
import HorizontalGraph from './myPageComponents/HorizontalGraph';
import config from '../config';

// Sample data
const sampleData: {
  medicationCounts: number;
  progress: [number, number][];
  medicationCalendar: [number, number][];
  horizontalGraph: [string, number][];
  statistics: [number, number, number];
} = {
  medicationCounts: 3,
  progress: [
    [3, 20],
    [2, 2],
    [1, 5],
    [0, 3],
  ],
  statistics: [145, 60, 10],
  medicationCalendar: [
    [28, 3],
    [29, 2],
    [30, 3],
    [1, 3],
    [2, 0],
    [3, 1],
    [4, 2],
    [5, 3],
    [6, 1],
    [7, 0],
    [8, 3], // Set this as "today" for demonstration purposes
  ],
  horizontalGraph: [
    ['주영', 8],
    ['서준', 3],
    ['지안', 5],
    ['민호', 2],
    ['하윤', 4],
    ['도윤', 3],
    ['영은', 4],
  ],
};

const MedicationTracker: React.FC = () => {
  const [calendarData, setCalendarData] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // Replace with dynamic user ID if needed
  const baseUrl = config.backendUrl;

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch(`${baseUrl}/myPage/calender?userId=${userId}`);
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [baseUrl, userId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* User Greeting Section */}
          <UserGreeting name="jlee4330" />

          {/* Calendar Section */}
          <Text style={styles.sectionHeaderText}>복약 달력</Text>
          <MedicationCalendar medicationData={calendarData} />

          {/* Progress Bar Section */}
          <Text style={styles.sectionHeaderText}>복약 비율</Text>
          <ProgressBar progressData={sampleData.progress} />

          {/* Statistics Section */}
          <Text style={styles.sectionHeaderText}>이걸뭐라고해야좋을까</Text>
          <Statistics statisticsData={sampleData.statistics} />

          {/* Horizontal Graph Section */}
          <Text style={styles.sectionHeaderText}>오늘 나를 찌른 사용자</Text>
          <HorizontalGraph graphData={sampleData.horizontalGraph} />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicationTracker;