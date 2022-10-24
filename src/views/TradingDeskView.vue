<template>
  <div class="trading-desk-view">
    <h1>Trading desk</h1>
    <ta-trading-desk @return-tile="showTile" @get-el-position="getElPosition">
      <ta-tile
        v-for="{id, title, width, height, x, y, zIndex} in shownTiles"
        :key="id"
        :tile-id="id"
        :title="title"
        :width="width"
        :height="height"
        :x="x"
        :y="y"
        :z-index="zIndex"
        :is-active="activeTile === id"
        @mousedown="activateTile"
        @hide-tile="hideTile"
        @save-tile-size="saveTileSize"
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
      activeTile: null,
      maxZIndex: defaultTileZIndex
    };
  },
  beforeMount() {
    this.tiles = JSON.parse(localStorage.getItem('tiles')) || getTilesUIConfig();
  },
  destroyed() {
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
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
    hideTile(tileId) {
      this.setTileParams(tileId, {
        isShown: false
      });
    },
    showTile(tileId) {
      this.setTileParams(tileId, {
        width: defaultTileWidth,
        height: defaultTileHeight,
        isShown: true
      });
    }, 
    saveTileSize(sizingData) {
      const { id: tileId, width, height } = sizingData;
      this.setTileParams(tileId, {
        width,
        height
      });
    },
    activateTile(tileId) {
      this.activeTile = tileId;
      this.setIncreasedIndex(tileId);
    },
    getElPosition(e) {
      const { target, position } = e;
      const { x, y } = position;
      const { tileId } = getTileProps(target);
      this.setTileParams(tileId, {
        x,
        y
      });
      this.setIncreasedIndex(tileId);
    },
    setIncreasedIndex(tileId) {
      this.maxZIndex = this.maxZIndex + 1;
      this.setTileParams(tileId, {
        zIndex: this.maxZIndex
      });
    },
    setTileParams(tileId, params) {
      const tile = this.tiles.find((tile) => tile.id == tileId);

      for (let key in params) {
        this.$set(tile, key, params[key]);
      }
    }
  }
}
</script>