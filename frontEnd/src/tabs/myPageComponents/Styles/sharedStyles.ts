import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  floatingShadow: {
    shadowColor: '#100',             // Dark shadow color for depth
    shadowOffset: { width: 0, height: 4 }, // Slight offset for shadow placement
    shadowOpacity: 0.1,              // Light opacity for subtle effect
    shadowRadius: 6,                 // Blur radius for softness
    elevation: 6,                    // Android shadow
  },
});

export default sharedStyles;
