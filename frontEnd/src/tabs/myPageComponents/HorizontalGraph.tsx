// HorizontalGraph.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import graphStyles from './Styles/graphStyles';

interface HorizontalGraphProps {
  graphData: [string, number][];
}

const HorizontalGraph: React.FC<HorizontalGraphProps> = ({ graphData }) => {
  // Find maximum count to adjust container height dynamically if needed
  const maxCount = Math.max(...graphData.map(([_, count]) => count));
  
  return (
    <View style={graphStyles.graphContainer}>
      <ScrollView
        horizontal
        contentContainerStyle={graphStyles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {graphData.map(([name, count], index) => (
          <View key={index} style={graphStyles.itemContainer}>
            {/* Circle and Bar Container */}
            <View style={[graphStyles.barContainer, { height: maxCount * 20, justifyContent: 'flex-end' }]}>
              {/* Display Circle */}
              <View
                style={[
                  graphStyles.circleContainer,
                  { backgroundColor: count >= 5 ? '#C5C5F3' : '#F0F4C3' }, // Color change based on count
                ]}
              >
                <Text style={graphStyles.circleText}>{count}</Text>
              </View>
              {/* Display Bars based on count */}
              {Array.from({ length: count }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    graphStyles.bar,
                    { backgroundColor: count >= 5 ? '#C5C5F3' : '#F0F4C3', height: 8, marginTop: 4 },
                  ]}
                />
              ))}
            </View>
            {/* Display Label */}
            <Text style={graphStyles.label}>{name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalGraph;