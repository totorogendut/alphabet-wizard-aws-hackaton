export function getRandomChild<T>(obj: Record<string, T>): T {
  const values = Object.values(obj); // Convert object values into an array
  const randomIndex = Math.floor(Math.random() * values.length); // Pick a random index
  return values[randomIndex]; // Return the random value
}

export function mergeArray<T>(...arr: T[][]): T[] {
  return ([] as T[]).concat(...arr);
}

export async function delay(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function isNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value);
}
