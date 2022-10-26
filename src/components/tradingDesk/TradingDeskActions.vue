<template>
  <div class="trading-desk-actions">
    <button
      class="trading-desk-actions-button"
      type="button"
      @click="showList"
    >
      + Return tile to trading desk
    </button>
    <div v-if="listIsShown" @click="hideList">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradingDeskActions',
  data() {
    return {
      listIsShown: false,
    }
  },
  methods: {
    showList() {
      this.listIsShown = true;
    },
    hideList() {
      this.listIsShown = false;
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