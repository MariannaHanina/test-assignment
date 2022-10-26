<template>
  <div class="trading-desk-actions">
    <button
      class="trading-desk-actions-button"
      type="button"
      @click="onClick"
    >
      + Return tile to trading desk
    </button>
  </div>
</template>

<script>
export default {
  name: 'TradingDeskActions',
  emits: ['return-click'],
  methods: {
    onClick() {
      this.$emit('return-click');
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