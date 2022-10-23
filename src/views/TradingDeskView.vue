<template>
  <div class="trading-desk-view">
    <h1>Trading desk</h1>
    <ta-trading-desk @returnTile="showTile">
      <template v-for="{id, title, isShown, width, height} in tiles" >
        <ta-tile
          v-if="isShown"
          :key="id"
          :tile-id="id"
          :title="title"
          :width="width"
          :height="height"
          @hideTile="hideTile"
          @saveTileSize="saveTileSize"
        />
      </template>
      <template v-slot:actions>
        <ta-trading-desk-actions >
          <ta-tiles-list
            :tiles="hiddenTiles"
            @tileClick="showTile"
          />
        </ta-trading-desk-actions>
      </template>
    </ta-trading-desk>
  </div>
</template>

<script>
import { getTilesUIConfig } from '@/utils/tiles';
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
    };
  },
  beforeMount() {
    this.tiles = JSON.parse(localStorage.getItem('tiles')) || getTilesUIConfig();
  },
  destroyed() {
    localStorage.setItem('tiles', JSON.stringify(this.tiles));
  },
  computed: {
    hiddenTiles() {
      return this.tiles.filter((tile) => !tile.isShown);
    }
  },
  methods: {
    hideTile(tileId) {
      const index = this.getTileIndex(tileId);
      this.$set(this.tiles[index], 'isShown', false);
    },
    showTile(tileId) {
      const index = this.getTileIndex(tileId);
      this.$set(this.tiles[index], 'isShown', true);
    }, 
    saveTileSize(sizingData) {
      const { id: tileId, width, height } = sizingData;
      const index = this.getTileIndex(tileId);
      this.$set(this.tiles[index], 'width', width);
      this.$set(this.tiles[index], 'height', height);
    },
    getTileIndex(tileId) {
      return this.tiles.findIndex((tile) => tile.id == tileId);
    }
  }
}
</script>