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
  const [userName, setUserName] = useState('');
  const [calendarData, setCalendarData] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // Replace with dynamic user ID if needed
  const baseUrl = config.backendUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userNameRes = await fetch(`${baseUrl}/myPage/user-name?userId=${userId}`);
        const calenderRes = await fetch(`${baseUrl}/myPage/calender?userId=${userId}`);

        const newUserNameData = await userNameRes.json();
        const newCalenderData = await calenderRes.json();

        setUserName(newUserNameData);
        setCalendarData(newCalenderData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <UserGreeting name={userName} />

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