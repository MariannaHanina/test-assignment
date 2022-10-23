export const getTilesUIConfig = () => {
  return new Array(5).fill({}).map((_, i) => ({
    id: i,
    title: `Tile ${i + 1}`,
    isShown: true,
    width: undefined,
    height: undefined
  }));
}