<template>
  <div class="trading-desk-view">
    <h1>Trading desk</h1>
    <ta-trading-desk @get-el-position="getElPosition">
      <ta-tile
        v-for="(tile, index) in shownTiles"
        v-model="shownTiles[index]"
        :key="tile.id"
        @inactivate-other-tiles="inactivateOtherTiles"
        @increase-z-index="setIncreasedZIndex"
        @tile-resized="saveTiles"
      />
      <template #actions>
        <ta-trading-desk-actions >
          <ta-tiles-list
            :tiles="hiddenTiles"
            @tile-click="showTile"
          />
        </ta-trading-desk-actions>
      </template>
    </ta-trading-desk>
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
import TATradingDesk from '@/components/tradingDesk/TATradingDesk';
import TATile from '@/components/tradingDesk/TATile';
import TATradingDeskActions from '@/components/tradingDesk/TATradingDeskActions.vue';
import TATileList from '@/components/tradingDesk/TATilesList';

export default {
  name: "TradingDeskView",
  components: {
    'ta-trading-desk': TATradingDesk,
    'ta-tile': TATile,
    'ta-tiles-list': TATileList,
    'ta-trading-desk-actions': TATradingDeskActions
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