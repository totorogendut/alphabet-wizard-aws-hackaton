export type Position = ReturnType<typeof setupPosition>;

export function setupPosition(data: { x: number; y: number }) {
  let x = $state(data.x);
  let y = $state(data.y);

  return {
    get x() {
      return x;
    },
    set x(val: number) {
      x = Math.min(Math.max(0, val), 100);
    },
    get y() {
      return y;
    },
    set y(val: number) {
      y = Math.min(val, 100);
    },
  };
}
