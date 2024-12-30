export const getChipColor = (level: number) => {
  const hue = (level * 40) % 360;
  return `hsl(${hue}, 70%, 90%)`;
};
