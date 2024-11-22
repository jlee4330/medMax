import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import config from '../config';
import styles from './myPageComponents/Styles/trackerStyles';
import MedicationCalendar from './myPageComponents/MedicationCalendar';
import ProgressBar from './myPageComponents/ProgressBar';
import Statistics from './myPageComponents/Statistics';
import UserGreeting from './myPageComponents/UserGreeting';
import HorizontalGraph from './myPageComponents/HorizontalGraph';

// Define the data structure for type safety
interface Data {
  medicationCalendar: any[]; // Replace `any` with the specific structure of medication calendar
  progress: any[]; // Replace `any` with the structure of progress data
  statistics: [number, number, number];
  horizontalGraph: [string, number][];
}

const MedicationTracker: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '123'; // Replace with dynamic user ID as needed
        const response = await axios.get(`${config.backendUrl}/calender`, {
          params: { userId },
        });
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* User Greeting Section */}
          <UserGreeting name="jlee4330" />

          {/* Calendar Section */}
          <Text style={styles.sectionHeaderText}>복약 달력</Text>
          <MedicationCalendar medicationData={data?.medicationCalendar || []} />

          {/* Progress Bar Section */}
          <Text style={styles.sectionHeaderText}>복약 비율</Text>
          <ProgressBar progressData={data?.progress || []} />

          {/* Statistics Section */}
          <Text style={styles.sectionHeaderText}>이걸뭐라고해야좋을까</Text>
          <Statistics statisticsData={data?.statistics || [0, 0, 0]} />

          {/* Horizontal Graph Section */}
          <Text style={styles.sectionHeaderText}>오늘 나를 찌른 사용자</Text>
          <HorizontalGraph graphData={data?.horizontalGraph || []} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicationTracker;
