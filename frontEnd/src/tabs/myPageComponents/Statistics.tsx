import React from 'react';
import { View, Text } from 'react-native';
import statisticsStyles from './Styles/statisticsStyles';

interface StatisticsProps {
  statisticsData: [number, number, number];
}

const Statistics: React.FC<StatisticsProps> = ({ statisticsData }) => {
  const labels = ['함께 약 먹은 날', '꾸준히 약 먹은 날', '약사에게 질문 수'];

  return (
    <View style={statisticsStyles.statisticsContainer}>
      {statisticsData.map((value, index) => (
        <View key={index} style={statisticsStyles.statistic}>
          <Text style={statisticsStyles.statLabel}>{labels[index]}</Text>
          <Text style={statisticsStyles.statValue}>{value}{index === 2 ? '개' : '일'}</Text>
        </View>
      ))}
    </View>
  );
};

export default Statistics;
