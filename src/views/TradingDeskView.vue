<template>
  <div class="trading-desk-view">
    <h1>Trading desk</h1>
    <trading-desk @end-position-change="setElEndPosition" @position-change="setElPosition">
      <trading-desk-tile
        v-for="(tile, index) in shownTiles"
        v-model="shownTiles[index]"
        :key="tile.id"
        @inactivate-other-tiles="inactivateOtherTiles"
        @increase-z-index="setIncreasedZIndex"
        @tile-resized="saveTiles"
      />
      <template #actions>
        <trading-desk-actions v-if="hiddenTiles.length" @return-click="openModal"/>
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
import { 
  getTilesUIConfig, 
  getTileProps,
  setTileParams,
  defaultWidth as defaultTileWidth,
  defautlHeight as defaultTileHeight,
  defaultZIndex as defaultTileZIndex
} from '@/utils/tiles';

import TradingDeskService from '@/services/TradingDeskService';
import TradingDesk from '@/components/tradingDesk/TradingDesk';
import TradingDeskTile from '@/components/tradingDesk/TradingDeskTile';
import TradingDeskActions from '@/components/tradingDesk/TradingDeskActions';
import TradingDeskTileList from '@/components/tradingDesk/TradingDeskTilesList';
import ModalDialog from '@/components/ui/ModalDialog';

export default {
  name: "TradingDeskView",
  components: {
    'trading-desk': TradingDesk,
    'trading-desk-tile': TradingDeskTile,
    'trading-desk-tiles-list': TradingDeskTileList,
    'trading-desk-actions': TradingDeskActions,
    'modal-dialog': ModalDialog
  },
  data: () => {
    return {
      tiles: [],
      zIndex: defaultTileZIndex,
      modalIsShown: false
    };
  },
  beforeMount() {
    this.tiles = TradingDeskService.getTiles() || getTilesUIConfig();
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
    },
    maxZIndex: {
      get() {
        return this.tiles.reduce((max, { zIndex }) => {
          return (zIndex > max) ? zIndex : max;
        }, this.zIndex);
      },
      set(value) {
        this.zIndex = value;
      }
    }
  },
  methods: {
    showTile(tile) {
      setTileParams(tile, {
        width: defaultTileWidth,
        height: defaultTileHeight,
        x: window.innerWidth/2 - defaultTileWidth/2,
        y: 100,
        isShown: true,
        isActive: true
      });
      this.closeModal();
      this.inactivateOtherTiles(tile);

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
    setElPosition(e) {
      const { target, position } = e;
      const tile = getTileProps(target);
      
      setTileParams(tile, position);
    },
    setElEndPosition(e) {
      const { target } = e;
      const tile = getTileProps(target);
    
      this.setElPosition(e);
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
      TradingDeskService.saveTiles(this.tiles);
    },
    openModal() {
      this.modalIsShown = true;
    },
    closeModal() {
      this.modalIsShown = false;
    }
  }
}
</script>