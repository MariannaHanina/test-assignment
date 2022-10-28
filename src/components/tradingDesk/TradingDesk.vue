<template>
  <div class="trading-desk">
    <div class="trading-desk-tiles">
      <drag-and-drop-area
        @el-end-drag="getElEndPosition" 
        @el-drag="getElPosition"
      >
        <slot />
      </drag-and-drop-area>
    </div>
    <div class="tradig-dest-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import DragAndDropArea from '@/components/ui/DragAndDropArea';

export default {
  name:'TradingDesk',
  components: {
    'drag-and-drop-area': DragAndDropArea
  },
  emits: ['end-position-chage', 'position-change'],
  methods: {
    getElEndPosition(e) {
      this.$emit('end-position-change', e);
    },
    getElPosition(e) {
      this.$emit('position-change', e)
    }
  }
}
</script>

<style scoped>
.trading-desk-tiles {
  border: 1px solid lightgray;
  height: 70vh;
}
</style>