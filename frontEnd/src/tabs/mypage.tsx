import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import styles from './myPageComponents/Styles/trackerStyles';
import MedicationCalendar from './myPageComponents/MedicationCalendar';
import ProgressBar from './myPageComponents/ProgressBar';
import Statistics from './myPageComponents/Statistics';
import UserGreeting from './myPageComponents/UserGreeting';
import HorizontalGraph from './myPageComponents/HorizontalGraph';
import config from '../config';
import DeviceInfo from 'react-native-device-info';


// Sample data
const sampleData: {
  nummedi: number;
  calendar: [number, number][];
  progress: [number, number][];
  horizontalGraph: [string, number][];
  statistics: [number, number, number];
} = {
  nummedi: 3,
  calendar: [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 2],
    [5, 1],
    [6, 3],
    [7, 2],
    [8, 1],
    [9, 3],
    [10, 2],
    [11, 1],
    [12, 3],
    [13, 2],
    [14, 1],
  ],
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
  const [userNumMedi, setUserNumMedi] = useState(0);
  const [userName, setUserName] = useState('');
  const [calendarData, setCalendarData] = useState<[number, number][]>([]);
  const [progressData, setProgressData] = useState<[number, number][]>([]);
  const [statistics, setStatistics] = useState<[number, number, number] | null>(null);
  const [horizontalGraphData, setHorizontalGraphData] = useState<[string, number][]>([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    const fetchUserId = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      setUserId(deviceId);
    };

    fetchUserId();
  }, []);
  const baseUrl = config.backendUrl;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading state
          const [
            userNumMediRes,
            userNameRes,
            calenderRes,
            progressRes,
            statisticsRes,
            horizontalGraphRes,
          ] = await Promise.all([
            axios.get(`${baseUrl}/myPage/num-medi`, { params: { userId } }),
            axios.get(`${baseUrl}/myPage/user-name`, { params: { userId } }),
            axios.get(`${baseUrl}/myPage/calender`, { params: { userId } }),
            axios.get(`${baseUrl}/myPage/thirty-day`, { params: { userId } }),
            axios.get(`${baseUrl}/myPage/statistics`, { params: { userId } }),
            axios.get(`${baseUrl}/myPage/pokers`, { params: { userId } }),
          ]);
  
          setUserNumMedi(userNumMediRes.data || 0);
          setUserName(userNameRes.data || 'Unknown User');
          setCalendarData(calenderRes.data || [[1, 0]]);
          const processedProgressData = processProgressData(progressRes.data, userNumMediRes.data);
          setProgressData(processedProgressData || []);
          setStatistics(statisticsRes.data || null);
          setHorizontalGraphData(horizontalGraphRes.data || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Clear loading state
        }
      };
  
      if (userId) {
        fetchData(); // Fetch data only when userId is available
      }
    }, [baseUrl, userId]) // Dependencies: baseUrl and userId
  );

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
          <UserGreeting name={userName} />

          <Text style={styles.sectionHeaderText}>복약 달력</Text>
          <MedicationCalendar medicationData={calendarData.length > 0 ? calendarData : sampleData.calendar} />

          <Text style={styles.sectionHeaderText}>복약 비율</Text>
          <ProgressBar progressData={progressData} medicationCounts={sampleData.nummedi} />

          <Text style={styles.sectionHeaderText}>함께한 날들</Text>
          {statistics && <Statistics statisticsData={statistics} />}

          <Text style={styles.sectionHeaderText}>오늘 나를 찌른 사용자</Text>
          <HorizontalGraph graphData={horizontalGraphData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicationTracker;

const processProgressData = (data: [number, number][], numMedi: number): [number, number][] => {
  const processedData: [number, number][] = [];
  const doseMap = new Map<number, number>();

  data.forEach(([dose, days]) => {
    const numericDose = Number(dose); // Ensure dose is a number
    const numericDays = Number(days); // Ensure days is a number
    doseMap.set(numericDose, (doseMap.get(numericDose) || 0) + numericDays);
  });

  for (let dose = numMedi; dose >= 0; dose--) {
    const numericDose = Number(dose); // Ensure dose is numeric here too
    const days = doseMap.get(numericDose) ?? 0; // Nullish coalescing operator for safe fallback
    processedData.push([numericDose, days]);
  }

  return processedData;
};
