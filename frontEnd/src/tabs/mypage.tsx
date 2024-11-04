import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

const MedicationTracker: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          
          {/* User Greeting Section */}
          <UserGreeting name="jlee4330" />

          {/* Calendar Placeholder */}
          <View style={styles.calendarPlaceholder} />

          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerText}>복약 데이터</Text>
          </View>

          {/* Progress Bar Section */}
          <View style={styles.progressBar}>
            <View style={[styles.progressSegment, { flex: 1, backgroundColor: '#9C98E7' }]} />
            <View style={[styles.progressSegment, { flex: 0.7, backgroundColor: '#BAB7EE' }]} />
            <View style={[styles.progressSegment, { flex: 0.5, backgroundColor: '#D7D6F5' }]} />
            <View style={[styles.progressSegment, { flex: 0.3, backgroundColor: '#F5F5FD' }]} />
          </View>

          {/* Medication Counts */}
          <View style={styles.medicationCountSection}>
            <MedicationIcon color="#9C98E7" label="💊3" />
            <MedicationIcon color="#BAB7EE" label="💊2" />
            <MedicationIcon color="#D7D6F5" label="💊1" />
            <MedicationIcon color="#F5F5FD" label="💊X" />
          </View>

          {/* Statistics Section */}
          <View style={styles.statisticsSection}>
            <Statistic label="함께 약 먹은 날" value="145일" />
            <Statistic label="꾸준히 약 먹은 날" value="60일" />
            <Statistic label="약사에게 질문 수" value="10개" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MedicationIcon: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.icon, { backgroundColor: color }]} />
    <Text style={styles.iconLabel}>{label}</Text>
  </View>
);

const Statistic: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.statistic}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const UserGreeting: React.FC<{ name: string }> = ({ name }) => (
  <View style={styles.greetingContainer}>
    <Text style={styles.greetingName}>{name} 님</Text>
    <Text style={styles.greetingText}>오늘도 잊지않고 복약💊 하셨나요?</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f4f8' },
  scrollContainer: { paddingVertical: 20 }, // ScrollView 컨테이너 스타일
  container: { flex: 1, paddingHorizontal: 30, paddingBottom: 20 },
  calendarPlaceholder: { height: 170, backgroundColor: 'white', borderRadius: 12, shadowColor: '#E7E7EB', shadowOpacity: 0.4, shadowRadius: 5, marginTop: 40, marginBottom: 20 },
  headerSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 25 },
  headerText: { color: 'rgba(0, 0, 0, 0.70)', fontSize: 20, fontWeight: '600' },
  progressBar: { height: 20, backgroundColor: '#F5F5FD', borderRadius: 10, marginBottom: 25, overflow: 'hidden', flexDirection: 'row' },
  progressSegment: {},
  medicationCountSection: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25 },
  iconContainer: { alignItems: 'center' },
  icon: { width: 24, height: 24, borderRadius: 12, marginBottom: 5 },
  iconLabel: { color: '#9CA0AB', fontSize: 12, fontWeight: '600' },
  statisticsSection: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#E7E7EB', shadowOpacity: 0.4, shadowRadius: 5, marginBottom: 25 },
  statistic: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statLabel: { color: '#9FA195', fontSize: 14 },
  statValue: { color: '#404335', fontSize: 16, fontWeight: '600' },
  greetingContainer: { paddingTop: 40, marginBottom: 30 },
  greetingName: { color: '#BAB7EE', fontSize: 24, fontWeight: '700', marginBottom: 10 },
  greetingText: { color: 'rgba(0, 0, 0, 0.80)', fontSize: 24, fontWeight: '700' },
});

export default MedicationTracker;
