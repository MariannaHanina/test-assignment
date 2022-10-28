export const getSteppedPosition = (x, y, step = 10) => {
  const steppedX = Math.ceil(x / step) * step;
  const steppedY = Math.ceil(y / step) * step;

  return {
    steppedX,
    steppedY
  }
}