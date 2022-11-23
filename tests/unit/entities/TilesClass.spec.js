import Tiles from "@/entities/TilesClass";

describe('Tiles Class', () => {
  describe('check passing params in the constructor', () => {
    test('if required params are not passed, to throw error', () => {
      expect(() => {new Tiles()}).toThrow(); 
    });

    test('required params are passed, list is filled', () => {
      const tiles = new Tiles(700, 800);

      expect(tiles.list.length).toBe(5);
    });

    test('list is passed', () => {
      const tiles = new Tiles(700, 800, 4, [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]);

      expect(tiles.list.length).toBe(4);
    });
  });

  describe('check methods', () => {
    let tiles;

    beforeEach(() => {
      tiles = new Tiles(700, 800, 4);
    });

    test('calcTilesInLine returns right value', () => {
      const tilesAmount = tiles.calcTilesInLine();

      expect(tilesAmount).toBe(2);
    });

    test('findMaxZIndex returns right max zIndex', () => {
      tiles.list = [{
        zIndex: 1,
      }, {
        zIndex: 5,
      }, {
        zIndex: 40
      }];

      const maxZIndex = tiles.findMaxZIndex();
      expect(maxZIndex).toBe(40);
    });

    test('calcTileLeftPosition returns right left position', () => {
      const leftPositionForSecondTile = tiles.calcTileLeftPosition(1);

      expect(leftPositionForSecondTile).toBe(310);
    });

    test('calcTilePosition returns right position', () => {
      const positionForSecondTile = tiles.calcTilePosition(3);

      expect(positionForSecondTile).toEqual({ left: 310, top: 110 });
    });

    test('setActiveTile activate tile by id, increase zIndex, other tiles are deactivated', () => {
      tiles.setActiveTile(1);
      
      expect(tiles.list[1].isActive).toBe(true);
      expect(tiles.list[1].zIndex).toBe(2);
      expect(tiles.list[0].isActive).toBe(false);
      expect(tiles.list[2].isActive).toBe(false);
      expect(tiles.list[3].isActive).toBe(false);
    });

    test('getShownTiles returns list with shown tiles', () => {
      tiles.list[1].hide();
      tiles.list[3].hide();

      const shownTiles = tiles.getShownTiles();

      expect(shownTiles.length).toBe(2);
      expect(shownTiles[0].id).toBe(0);
      expect(shownTiles[1].id).toBe(2);
    });

    test('getHiddenTiles returns list with hidden tiles', () => {
      tiles.list[3].hide();

      const shownTiles = tiles.getHiddenTiles();

      expect(shownTiles.length).toBe(1);
      expect(shownTiles[0].id).toBe(3);
    });

    test('showTileById shows certain tile, set position in center and activate it', () => {
      tiles.list[1].hide();
      tiles.showTileById(1);

      const tile = tiles.list[1];
      const x = (700 / 2) - (300 / 2);
      const y = (800 / 2) - (100 / 2);

      expect(tile.isShown).toBe(true);
      expect(tile.x).toBe(x);
      expect(tile.y).toBe(y);
      expect(tile.isActive).toBe(true);
    });

    test('adjustZIndexs recalculates zIndex for tiles', () => {
      tiles.setActiveTile(0);
      tiles.setActiveTile(1);
      tiles.setActiveTile(0);
      tiles.setActiveTile(2);
      tiles.setActiveTile(3);
      
      tiles.adjustZIndexs();

      expect(tiles.list[0].zIndex).toBe(2);
      expect(tiles.list[1].zIndex).toBe(1);
      expect(tiles.list[2].zIndex).toBe(3);
      expect(tiles.list[3].zIndex).toBe(4);
    });
  });
});