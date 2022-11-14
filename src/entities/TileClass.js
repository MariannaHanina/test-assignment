export default class Tile {
  id;
  title;
  isShown = true;
  isActive = false;
  width;
  height; 
  x;
  y;
  zIndex = 1;

  constructor(id, defaultLeft, defaultTop, defaultWidth = 300, defaultHeight = 100, additionalProps = null) {  
    this.id = id;
    this.title = `Tile ${this.id + 1}`;
    this.setSize(defaultWidth, defaultHeight);
    this.setPosition(defaultLeft, defaultTop);

    if (additionalProps) {
      for (const key in additionalProps) {
        if (Object.hasOwn(this, key)) {
          this[key] = additionalProps[key];
        }
      }
    }
  }

  activate() {
    this.isActive = true;

    return this;
  }

  deactivate() {
    this.isActive = false;
  
    return this;
  }

  show() {
    this.isShown = true;
    
    return this;
  }

  hide() {
    this.isShown = false;

    return this;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;

    return this;
  }

  setPosition(left, top) {
    this.x = left;
    this.y = top;

    return this;
  }

  setZIndex(zIndex) {
    this.zIndex = zIndex;

    return this;
  }
}