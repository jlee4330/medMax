const getProgressColor = (count: number, maxCount: number) => {
  const colors = ['#F5F5FD', '#D7D6F5', '#BAB7EE', '#9C98E7', '#817DD7', '#6A65CE']; // Extended shades
  const index = Math.min(count, colors.length - 1); // Cap index at available colors
  return colors[index];
};

export default getProgressColor;

