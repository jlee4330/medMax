const getProgressColor = (count: number) => {
    if (count === 3) return '#9C98E7';
    if (count === 2) return '#BAB7EE';
    if (count === 1) return '#D7D6F5';
    return '#F5F5FD';
  };
  
  export default getProgressColor;
  