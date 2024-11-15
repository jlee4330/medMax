import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/userGreetingStyles.ts'; // Import the styles from a separate file

interface UserGreetingProps {
  name: string;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ name }) => (
  <View style={styles.greetingContainer}>
    <Text style={styles.greetingName}>{name} 님</Text>
    <Text style={styles.greetingText}>오늘도 잊지 않고 복약💊 하셨나요?</Text>
  </View>
);

export default UserGreeting;
