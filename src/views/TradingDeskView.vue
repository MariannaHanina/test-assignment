<template>
  <div class="trading-desk-view">
    <h1>Trading desk</h1>
    <trading-desk
      @position-change="setTilePosition"
      @end-position-change="saveTiles"
      ref="desk"
    >
      <trading-desk-tile
        v-for="(tile, index) in shownTiles"
        v-model="shownTiles[index]"
        :key="tile.id"
        @activate-tile="activateTile"
        @close-tile="saveTiles"
        @tile-resized="saveTiles"
      />
      <template #actions>
        <div class="trading-desk-actions">
          <button
            v-if="hiddenTiles.length"
            class="trading-desk-actions-button"
            type="button"
            @click="openModal"
          >
            + Return tile to trading desk
          </button>
          <button
            class="trading-desk-actions-button"
            type="button"
            @click="resetTiles"
          >
            Reset desk
          </button>
        </div>
      </template>
    </trading-desk>
    <modal-dialog
      v-show="modalIsShown"
      @close="closeModal"
    >
      <template #header>
        Return tale on Trading Desk
      </template>
      <div>
        <p>Select a tile from the list to return it to the Desk</p>
        <trading-desk-tiles-list
          :tiles="hiddenTiles"
          @tile-click="showTile"
        />
      </div>
    </modal-dialog>
  </div>
</template>

<script>
import Tiles from '@/entities/TilesClass';

import TradingDeskService from '@/services/TradingDeskService';
import TradingDesk from '@/components/tradingDesk/TradingDesk';
import TradingDeskTile from '@/components/tradingDesk/TradingDeskTile';
import TradingDeskTileList from '@/components/tradingDesk/TradingDeskTilesList';
import ModalDialog from '@/components/ui/ModalDialog';

export default {
  name: "TradingDeskView",
  components: {
    'trading-desk': TradingDesk,
    'trading-desk-tile': TradingDeskTile,
    'trading-desk-tiles-list': TradingDeskTileList,
    'modal-dialog': ModalDialog
  },
  data() {
    return {
      tiles: null,
      modalIsShown: false
    };
  },
  mounted() {
    const { offsetWidth: deskWidth, offsetHeight: deskHeight } = this.$refs['desk'].$el;
    this.deskWidth = deskWidth;
    this.deskHeight = deskHeight;

    const savedTiles = TradingDeskService.getTiles();

    if (savedTiles) {
      this.tiles = new Tiles(deskWidth, deskHeight, 5, savedTiles);
      return;
    }
    
    this.tiles = new Tiles(deskWidth, deskHeight);
  },
  destroyed() {
    this.saveTiles();
  },
  computed: {
    shownTiles() {
      return this.tiles?.getShownTiles() || [];
    },
    hiddenTiles() {
      return this.tiles?.getHiddenTiles() || [];
    },
  },
  methods: {
    showTile(id) {
      this.tiles.showTileById(id);
      this.closeModal();
    }, 
    activateTile(id) {
      this.tiles.setActiveTile(id);
      this.saveTiles();
    },
    setTilePosition(e) {
      const { targetComponent, position } = e;
      const { tile } = targetComponent;
      const { x, y } = position;

      tile.setPosition(x, y);
    },
    openModal() {
      this.modalIsShown = true;
    },
    closeModal() {
      this.modalIsShown = false;
    },
    saveTiles() {
      TradingDeskService.saveTiles(this.tiles.list);
    },
    resetTiles() {
      TradingDeskService.removeTiles();
      this.tiles = new Tiles(this.deskWidth, this.deskHeight);
    }
  }
}
</script>

<style scoped>
.trading-desk-actions {
  display: flex;
  justify-content: center;
}
.trading-desk-actions-button {
  padding: 15px 20px;
}
</style>