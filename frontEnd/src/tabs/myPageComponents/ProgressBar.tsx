import React from 'react';
import { View, Text } from 'react-native';
import progressBarStyles from './Styles/progressBarStyles';
import getProgressColor from './helpers/getProgressColor';

interface ProgressBarProps {
  progressData: [number, number][];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressData }) => {
  return (
    <View style={progressBarStyles.container}>
      <View style={progressBarStyles.progressBar}>
        {progressData.map(([count, days], index) => (
          <View
            key={index}
            style={[
              progressBarStyles.progressSegment,
              {
                flex: days,
                backgroundColor: getProgressColor(count),
              },
            ]}
          />
        ))}
      </View>
      
      {/* Legend */}
      <View style={progressBarStyles.legendContainer}>
        <LegendItem color="#9C98E7" label="3" />
        <LegendItem color="#BAB7EE" label="2" />
        <LegendItem color="#D7D6F5" label="1" />
        <LegendItem color="#F5F5FD" label="0" />
      </View>
    </View>
  );
};

// Component for each item in the legend
const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <View style={progressBarStyles.legendItem}>
    <View style={[progressBarStyles.legendCircle, { backgroundColor: color }]} />
    <Text style={progressBarStyles.legendLabel}>{label}</Text>
  </View>
);

export default ProgressBar;
