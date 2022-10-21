<template>
  <div class="trading-desk">
    <div class="trading-desk-tiles">
      <slot />
    </div>
    <button type="button" @click="onClick">+ Return tile to trading desk</button>
  </div>
</template>

<script>
export default {
  name:'TATradingDesk',
  emits: ['returnTile'],
  methods: {
    onClick: function() {
      this.$emit('returnTile');
    }
  }
}
</script>

<style scoped>
.trading-desk-tiles {
  display: flex;
}
</style>