export default class TradingDeskService {
  static saveTiles(tiles) {
    localStorage.setItem('tiles', JSON.stringify(tiles));
  }

  static getTiles() {
    return JSON.parse(localStorage.getItem('tiles'));
  }

  static removeTiles() {
    localStorage.removeItem('tiles');
  }
}