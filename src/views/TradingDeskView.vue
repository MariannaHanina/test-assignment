<template>
  <div class="trading-desk-view">
    <h1>Trading desk</h1>
    <trading-desk @get-el-position="getElPosition">
      <trading-desk-tile
        v-for="(tile, index) in shownTiles"
        v-model="shownTiles[index]"
        :key="tile.id"
        @inactivate-other-tiles="inactivateOtherTiles"
        @increase-z-index="setIncreasedZIndex"
        @tile-resized="saveTiles"
      />
      <template #actions>
        <trading-desk-actions >
          <trading-desk-tiles-list
            :tiles="hiddenTiles"
            @tile-click="showTile"
          />
        </trading-desk-actions>
      </template>
    </trading-desk>
  </div>
</template>

<script>
import { 
  getTilesUIConfig, 
  getTileProps,
  setTileParams,
  defaultWidth as defaultTileWidth,
  defautlHeight as defaultTileHeight,
  defaultZIndex as defaultTileZIndex
} from '@/utils/tiles';
import TradingDesk from '@/components/tradingDesk/TradingDesk';
import TradingDeskTile from '@/components/tradingDesk/TradingDeskTile';
import TradingDeskActions from '@/components/tradingDesk/TradingDeskActions';
import TradingDeskTileList from '@/components/tradingDesk/TradingDeskTilesList';

export default {
  name: "TradingDeskView",
  components: {
    'trading-desk': TradingDesk,
    'trading-desk-tile': TradingDeskTile,
    'trading-desk-tiles-list': TradingDeskTileList,
    'trading-desk-actions': TradingDeskActions
  },
  data: () => {
    return {
      tiles: [],
      maxZIndex: defaultTileZIndex
    };
  },
  beforeMount() {
    this.tiles = JSON.parse(localStorage.getItem('tiles')) || getTilesUIConfig();
  },
  destroyed() {
    this.saveTiles();
  },
  computed: {
    shownTiles() {
      return this.tiles.filter((tile) => tile.isShown);
    },
    hiddenTiles() {
      return this.tiles.filter((tile) => !tile.isShown);
    }
  },
  methods: {
    showTile(tile) {
      setTileParams(tile, {
        width: defaultTileWidth,
        height: defaultTileHeight,
        isShown: true
      });
    }, 
    inactivateOtherTiles(activeTile) {
      const tiles = this.tiles.filter((tile) => tile.id != activeTile.id);
      for (let key in tiles) {
        setTileParams(tiles[key], {
          isActive: false
        })
      }
      this.setIncreasedZIndex(activeTile);
    },
    getElPosition(e) {
      const { target, position } = e;
      const { x, y } = position;
      const tile = getTileProps(target);
      setTileParams(tile, {
        x,
        y
      });
      this.setIncreasedZIndex(tile);
      this.saveTiles();
    },
    setIncreasedZIndex(tile) {
      this.maxZIndex = this.maxZIndex + 1;
      setTileParams(tile, {
        zIndex: this.maxZIndex
      });
    },
    saveTiles() {
      localStorage.setItem('tiles', JSON.stringify(this.tiles));
    }
  }
}
</script>