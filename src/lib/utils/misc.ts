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

export function getRandomItems(array: Array<unknown>, min = 1, max = 2) {
  if (array.length < min) {
    throw new Error("Array must have at least 'min' items.");
  }

  const count = Math.floor(Math.random() * (max - min + 1)) + min; // Random count between min and max
  const shuffled = [...array].sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, Math.min(count, array.length)); // Return the desired number of items
}
