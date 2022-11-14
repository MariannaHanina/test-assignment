import Tile from "./TileClass";

export default class Tiles {
  #amount;
  #containerWidth;
  #containerHeight;
  #defaultTileWidth = 300;
  #defaultTileHeight = 100;
  #tilesInLine;
  #step = 10;
  #maxZIndex = 1;
  list = [];

  constructor(containerWidth, containerHeight, amount = 5, tiles = []) {
    this.#amount = amount;
    this.#containerWidth = containerWidth;
    this.#containerHeight = containerHeight;
    this.#tilesInLine = this.calcTilesInLine();

    if (tiles && tiles.length) {
      this.uploadList(tiles);
      this.#maxZIndex = this.findMaxZIndex();
      return;
    } 

    this.fillList();    
  }

  calcTilesInLine() {
    return Math.floor(this.#containerWidth / (this.#defaultTileWidth + this.#step));
  }

  fillList() {
    for (let i = 0; i < this.#amount; i += 1) {
      const { left, top } = this.calcTilePosition(i);
      const tile = new Tile(i, left, top, this.#defaultTileWidth, this.#defaultTileHeight);
      this.list.push(tile);
    }
  }

  uploadList(tiles) {
    this.list = tiles.map(({ id, width, height, x, y,  ...rest }) => new Tile(id, x, y, width, height, rest));
  }

  findMaxZIndex() {
    return this.list.reduce((max, { zIndex }) => (zIndex > max) ? zIndex : max, 0)
  }

  calcTilePosition(index) {
    let lineNumber = Math.ceil((index + 1) / this.#tilesInLine) - 1;
    let startLineIndex = this.#tilesInLine * lineNumber;
    
    let left = this.calcTileLeftPosition(index - startLineIndex);
    let top = (this.#defaultTileHeight + this.#step) * lineNumber;

    return {left, top};
  }

  calcTileLeftPosition(index) {
    return (index * this.#defaultTileWidth) + (this.#step * index);
  }

  setActiveTile(id) {
    this.adjustZIndexs();

    this.list.map((tile) => {
      if (tile.id !== id) return tile.deactivate();
      
      if (tile.isActive === false) return tile.activate().setZIndex(++this.#maxZIndex); 
      
      return tile;
    });
  }

  getShownTiles() {
    return this.list.filter(({ isShown }) => isShown);
  }

  getHiddenTiles() {
    return this.list.filter(({ isShown }) => !isShown);
  }

  showTileById(id) {
    const tile = this.list.find((tile) => tile.id === id );
    const centerPositionLeft = (this.#containerWidth / 2) - (this.#defaultTileWidth / 2);
    const centerPositionTop = (this.#containerHeight / 2) - (this.#defaultTileHeight / 2);

    tile
      .show()
      .setSize(this.#defaultTileWidth, this.#defaultTileHeight)
      .setPosition(centerPositionLeft, centerPositionTop);
    
    this.setActiveTile(id);
  }

  adjustZIndexs() {
    if (this.#maxZIndex < this.#amount - 1) return;
    this.list.map((tile) => (tile.zIndex > 1) 
      ? tile.setZIndex(tile.zIndex - 1)
      : tile.setZIndex(1)
    );

    this.#maxZIndex = this.#amount;  
  }
}