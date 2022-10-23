<template>
  <div class="trading-desk">
    <div class="trading-desk-tiles">
      <slot />
    </div>
    <div class="tradig-dest-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>


export default {
  name:'TATradingDesk'
}
</script>

<style scoped>
.trading-desk-tiles {
  position: relative;
}
</style>