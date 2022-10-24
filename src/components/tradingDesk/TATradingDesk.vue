<template>
  <div class="trading-desk">
    <div class="trading-desk-tiles">
      <drag-and-drop-area @get-el-position="getElPosition">
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
  name:'TATradingDesk',
  components: {
    'drag-and-drop-area': DragAndDropArea
  },
  emits: ['get-el-position'],
  methods: {
    getElPosition(e) {
      this.$emit('get-el-position', e);
    }
  }
}
</script>

<style scoped>
.trading-desk-tiles {
  position: relative;
  height: 70vh;

}
</style>