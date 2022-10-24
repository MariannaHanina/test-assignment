<template>
  <div
    class="tile"
    :class="{ 'tile--active': isActive }"
    :style="styles"
    @mousedown="activateTile"
    v-resize="resizeTile"
    draggable
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
    isActive: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 100
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    zIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      newWidth: null,
      newHeight: null,
      initCoordinats: {},
      newCoordinats: null
    };
  },
  computed: {
    styles: (vm) => {
      return {
        width: `${vm.width}px`,
        height: `${vm.height}px`,
        left: `${vm.x}px`,
        top: `${vm.y}px`,
        'z-index': vm.zIndex
      };
    }
  },
  beforeDestroy() {
    this.$emit('save-tile-size', {
      id: this.tileId,
      width: this.newWidth,
      height: this.newHeight 
    })
  },
  emits: ['hide-tile', 'save-tile-size', 'mousedown'],
  methods: {
    activateTile() {
      this.$emit('mousedown', this.tileId);
    },
    hideTile() {
      this.$emit('hide-tile', this.tileId);
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
  background: white;
  border: 2px solid gray;

  position: absolute;

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

.tile--active{
  border-color: steelblue;
}

.tile--active .tile-title{
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