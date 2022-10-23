<template>
  <div>
    <button type="button" @click="showList">+ Return tile to trading desk</button>
    <div v-if="listIsShown" @click="hideList">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TATradingDeskActions',
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