<template>
  <div class="trading-desk-view">
    <h1>Trading desk</h1>
    <ta-trading-desk @returnTile="returnTile">
      <template v-for="{id, title, isShown} in tiles" >
        <ta-tile
          v-if="isShown"
          :key="id"
          :tile-id="id"
          :title="title"
          :is-active="id === activeTile"
          @click="clickTile"
          @hideTile="hideTile"
        />
      </template>
    </ta-trading-desk>
  </div>
</template>

<script>
import TATradingDesk from '@/components/tradingDesk/TATradingDesk';
import TATile from '@/components/tradingDesk/TATile';

function generateTile () {
  return new Array(5).fill({}).map((_, i) => ({
    id: i,
    title: `Tile ${i + 1}`,
    isShown: true
  }));
}

export default {
  name: "TradingDeskView",
  components: {
    'ta-trading-desk': TATradingDesk,
    'ta-tile': TATile
  },
  data: () => {
    return {
      tiles: generateTile(),
      activeTile: null,
      lastHiddenTile: null
    };
  },
  methods: {
    clickTile: function(tileId) {
      this.activeTile = tileId;
    },
    hideTile: function(tileId) {
      this.tiles = this.tiles.map((tile) => {
        if (tile.id === tileId) {
          this.lastHiddenTile = tile.id;
          return { ...tile, isShown: false };
        }

        return tile;
      });
    },
    returnTile: function() {
      this.tiles = this.tiles.map((tile) => {
        if (tile.id == this.lastHiddenTile) {
          this.lastHiddenTile = null;
          return { ...tile, isShown: true };
        }

        return tile;
      })
    }
  }
}
</script>