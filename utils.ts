

export const getDateOnly = (date: Date): string => {
  return date.toISOString().split('T')[0];
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const logger = (...args: unknown[]) => {
  console.log("LOGGER: ", ...args);
}
