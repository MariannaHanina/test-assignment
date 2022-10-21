<template>
  <div
    class="tile" 
    :class="{'tile--active': isActive}"
    :style="styles"
    @click="onClick"
  >
    <div class="tile-title">
      <span>{{ title }}</span>
      <button type="button" class="tile-remove-button" @click="hideTile">-</button>
    </div>
    <div class="tile-body">
      Body tile
    </div>
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
    }
  },
  data: () => {
    return {
      defaultWidth: '300px',
      defaultHeight: '100px'
    }
  },
  computed: {
    styles: (vm) => {
      return {
        width: vm.defaultWidth,
        height: vm.defaultHeight
      };
    }
  },
  emits: ['click'],
  methods: {
    onClick: function() {
      this.$emit('click', this.tileId);
    },
    hideTile: function() {
      this.$emit('hideTile', this.tileId);
    }
  }
}
</script>

<style scoped>
.tile {
  border: 2px solid gray;
  margin: 10px;
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

.tile--active {
  border-color: steelblue;
}

.tile--active .tile-title{
  background-color: lightskyblue;
  border-color: steelblue;
}
</style>