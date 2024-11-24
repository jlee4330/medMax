const getProgressColor = (count: number, maxCount: number) => {
  const colors = ['#F5F5FD', '#D7D6F5', '#BAB7EE', '#9C98E7']; // Add more shades if needed
  const index = Math.min(count, maxCount); // Ensure count doesn't exceed maxCount
  return colors[index] || colors[colors.length - 1]; // Fallback to the last color if needed
};

export default getProgressColor;
