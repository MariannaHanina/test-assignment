import Vue from "vue";

const defaultTop = 20;
const gapBetweenTiles = 20;
export const defaultWidth = 300;
export const defautlHeight = 100;
export const defaultZIndex = 100;

const calcLeftPosition = (index) => {
  return defaultWidth * index + gapBetweenTiles * (index + 1);
}

export const getTilesUIConfig = () => {
  return new Array(5).fill({}).map((_, i) => ({
    id: i,
    title: `Tile ${i + 1}`,
    isShown: true,
    isActive: false,
    width: defaultWidth,
    height: defautlHeight, 
    x: calcLeftPosition(i),
    y: defaultTop,
    zIndex: defaultZIndex
  }));
}

export const getTileProps = (tile) => {
  return tile.__vue__._props.tile;
}

export const setTileParams = (tile, params) => {
  for (let key in params) {
    Vue.set(tile, key, params[key]);
  }
}