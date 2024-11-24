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
  nummedi: number;
  progress: [number, number][];
  horizontalGraph: [string, number][];
  statistics: [number, number, number];
} = {
  nummedi: 3,
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
  const [loading, setLoading] = useState(true);

  const userId = 1;
  const baseUrl = config.backendUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userNumMediRes,
          userNameRes,
          calenderRes,
          progressRes,
          togetherMediRes,
          fullMediRes,
          qNumRes,
        ] = await Promise.all([
          fetch(`${baseUrl}/myPage/num-medi?userId=${userId}`),
          fetch(`${baseUrl}/myPage/user-name?userId=${userId}`),
          fetch(`${baseUrl}/myPage/calender?userId=${userId}`),
          fetch(`${baseUrl}/myPage/thirty-day?userId=${userId}`),
          fetch(`${baseUrl}/myPage/together-medi?userId=${userId}`),
          fetch(`${baseUrl}/myPage/full-medi?userId=${userId}`),
          fetch(`${baseUrl}/myPage/q-num?userId=${userId}`),
        ]);

        const [
          newUserNumMediData,
          newUserNameData,
          newCalenderData,
          newProgressData,
          togetherMediData,
          fullMediData,
          qNumData,
        ] = await Promise.all([
          userNumMediRes.json(),
          userNameRes.json(),
          calenderRes.json(),
          progressRes.json(),
          togetherMediRes.json(),
          fullMediRes.json(),
          qNumRes.json(),
        ]);

        setUserNumMedi(newUserNumMediData || 0);
        setUserName(newUserNameData || 'Unknown User');
        setCalendarData(newCalenderData || []);

        const processedProgressData = processProgressData(newProgressData, newUserNumMediData);
        setProgressData(processedProgressData);

        setStatistics([
          togetherMediData || 0,
          fullMediData || 0,
          qNumData || 0,
        ]);
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
          <UserGreeting name={userName} />

          <Text style={styles.sectionHeaderText}>복약 달력</Text>
          <MedicationCalendar medicationData={calendarData} />

          <Text style={styles.sectionHeaderText}>복약 비율</Text>
          <ProgressBar progressData={sampleData.progress} medicationCounts={sampleData.nummedi} />

          <Text style={styles.sectionHeaderText}>이걸뭐라고해야좋을까</Text>
          {statistics && <Statistics statisticsData={statistics} />}

          <Text style={styles.sectionHeaderText}>오늘 나를 찌른 사용자</Text>
          <HorizontalGraph graphData={sampleData.horizontalGraph} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicationTracker;


const processProgressData = (data: [number, number][], maxDose: number): [number, number][] => {
  const processedData: [number, number][] = [];
  const doseMap = new Map<number, number>();

  data.forEach(([dose, days]) => {
    doseMap.set(dose, days);
  });

  for (let dose = maxDose; dose >= 0; dose--) {
    processedData.push([dose, doseMap.get(dose) || 0]);
  }

  return processedData;
};