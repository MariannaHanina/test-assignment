import Tile from "@/entities/TileClass";

describe('Tile Class', () => {
  describe('check passing params in the constructor', () => {
    const defaultValues = {
      isShown: true,
      isActive: false,
      width: 300,
      height: 100,
      x: 0,
      y: 0,
      zIndex: 1
    };
  
    test('if required param is not passed, to throw error', () => {
      expect(() => {new Tile()}).toThrow(); 
    });
    
    test('only id param is passed, other params have values by default', () => {
      const tile = new Tile(1);
      const values = {
        ...defaultValues,
        id: 1,
        title: 'Tile 2'
      };

      expect(tile).toEqual(values);
    });  

    test('if id, size and position params are passed,  default params values are replices by them', () => {
      const left = 100;
      const top = 200;
      const width = 500;
      const height = 600;

      const tile = new Tile(2, left, top, width, height);
      const values = {
        ...defaultValues, 
        id: 2,
        title: 'Tile 3',
        x: left,
        y: top,
        width,
        height
      };

      expect(tile).toEqual(values);
    });

    test(('if title is passed in additional params object, it replaces generated title'), () => {
      const title = 'New title';
      const tile = new Tile(3, 0, 0, 0, 0, {title});

      expect(tile.title).toBe(title);
    });
  });

  describe('check methods', () => {
    let tile;

    beforeEach(() => {
      tile = new Tile(1);
    });

    test('activate method set isActive param to true', () => {
      expect(tile.isActive).toBe(false);
      tile.activate();
      expect(tile.isActive).toBe(true);
    });

    test('deactivate method set isActive param to false', () => {
      tile.activate().deactivate();
      expect(tile.isActive).toBe(false);
    });

    test('hide method set isShown param to true', () => {
      expect(tile.isShown).toBe(true);
      tile.hide();
      expect(tile.isShown).toBe(false);
    });

    test('show method set isShown param to true', () => {
      tile.hide().show();
      expect(tile.isShown).toBe(true);
    });

    test('setSize method set width and height params to passed values', () => {
      const width = 550;
      const height = 660;
      tile.setSize(width, height);
      expect(tile.width).toBe(width);
      expect(tile.height).toBe(height);
    });

    test('setPosition method set x and y params to passed values', () => {
      const left = 440;
      const top = 330;
      tile.setPosition(left, top);
      expect(tile.x).toBe(left);
      expect(tile.y).toBe(top);
    });

    test('setZIndex method set zIndex to passed value', () => {
      const zIndex = 123;
      tile.setZIndex(zIndex);
      expect(tile.zIndex).toBe(zIndex);
    });
  });
});