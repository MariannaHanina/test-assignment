<template>
  <div
    class="tile"
    :style="styles"
    v-resize="resizeTile"
  >
    <div class="tile-title">
      <span>{{ title }}</span>
      <button type="button" class="tile-remove-button" @click="hideTile">-</button>
    </div>
    <div class="tile-body" />
  </div>
</template>

<script>

export default {
  name:'TATile',
  props: {
    tileId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }, 
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 100
    }
  },
  computed: {
    styles: (vm) => {
      return {
        width: `${vm.width}px`,
        height: `${vm.height}px`,
        newWidth: null,
        newHeight: null
      };
    }
  },
  beforeDestroy() {
    this.$emit('saveTileSize', {
      id: this.tileId,
      width: this.newWidth,
      height: this.newHeight
    })
  },
  emits: ['hideTile', 'saveTileSize'],
  methods: {
    hideTile() {
      this.$emit('hideTile', this.tileId);
    },
    resizeTile({ width, height }) {
      this.newWidth = width;
      this.newHeight = height;
    }
  }
}
</script>

<style scoped>
.tile {
  display: inline-block;

  border: 2px solid gray;
  margin: 10px;

  cursor: pointer;

  resize: both;
  overflow: auto;
}
.tile-title {
  position: relative;
  border-bottom: 2px solid gray;
  padding: 10px;

  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
}

.tile-remove-button {
  position: absolute;
  left: 10px;
}
.tile-body {
  padding: 10px;
}

.tile:hover{
  border-color: steelblue;
}

.tile:hover .tile-title{
  background-color: lightskyblue;
  border-color: steelblue;
}

.tile-resize-y {
  position: absolute;
  bottom: 0;

  height: 2px;
  width: 100%;
}
.tile-resize-y:hover {
  background-color: lightgray;

  cursor: row-resize;
}
</style>