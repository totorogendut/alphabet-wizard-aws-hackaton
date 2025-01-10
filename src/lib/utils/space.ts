export function isOverlappingCircle(
  element: HTMLElement,
  x: number,
  y: number,
  radius: number
) {
  // Get the bounding rectangle of the DOM element
  const rect = element.getBoundingClientRect();

  // Calculate the closest point on the rectangle to the circle's center
  const closestX = Math.max(rect.left, Math.min(x, rect.right));
  const closestY = Math.max(rect.top, Math.min(y, rect.bottom));

  // Calculate the distance between the circle's center and this closest point
  const distanceX = x - closestX;
  const distanceY = y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  // Check if the distance is less than the radius squared (circle contains this point)
  return distanceSquared < radius * radius;
}

export function speedDifference(A: number, B: number) {
  // const difference = Math.abs(A - B); // Calculate the absolute difference
  const difference = Math.min(0, A - B); // Calculate the absolute difference
  const decreaseRate = 1; // Adjust this rate (e.g., 0.1 = 10% decrease per unit difference)
  const newB = B - difference * decreaseRate;

  return newB < 0 ? 0 : newB; // Ensure B doesn't go below 0
}

export function getEnemyInRadius(
  x: number,
  y: number,
  radius: number
): string[] {
  // Select all elements with the attribute 'data-enemy'
  const elements = document.querySelectorAll("[data-enemy-id]");
  const overlappingElements: HTMLElement[] = [];

  for (const element of elements) {
    const el = element as HTMLElement;
    isOverlappingCircle(el, x, y, radius) && overlappingElements.push(el);
  }

  return overlappingElements.map((el) => el.dataset.enemyId as string);
}
