import React from 'react';
import { View, Text } from 'react-native';
import progressBarStyles from './Styles/progressBarStyles';
import getProgressColor from './helpers/getProgressColor';

interface ProgressBarProps {
  progressData: [number, number][];
  medicationCounts: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressData, medicationCounts }) => {
  return (
    <View style={progressBarStyles.container}>
      <View style={progressBarStyles.progressBar}>
        {progressData
          .filter(([_, days]) => days > 0) // Exclude segments with 0 days
          .map(([count, days], index) => (
            <View
              key={index}
              style={[
                progressBarStyles.progressSegment,
                {
                  flex: days,
                  backgroundColor: getProgressColor(count, medicationCounts),
                },
              ]}
            />
          ))}
      </View>

      {/* Legend */}
      <View style={progressBarStyles.legendContainer}>
        {Array.from({ length: Math.min(medicationCounts + 1, 6) }).map((_, i) => ( // Limit to 6 colors
        <LegendItem key={i} color={getProgressColor(i, medicationCounts)} label={`${i}`} />
        ))}
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

