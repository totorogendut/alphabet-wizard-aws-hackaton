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
