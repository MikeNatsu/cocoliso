

export const getDateOnly = (date: Date): string => {
  return date.toISOString().split('T')[0];
}