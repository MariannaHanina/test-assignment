<template>
  <div
    class="drag-and-drop-area"
    @dragstart="startDrag"
    @dragend="endDrag"
    @dragover.prevent 
    @dragenter.prevent
  > 
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DragAndDropArea',
  data() {
    return {
      targetEl: null,
      dragginElStartPosition: null,
      dragginElEndPosition: null,
      cursorStartPosition: null,
      cursorEndPosition: null,
      offsetX: null,
      offsetY: null
    }
  },
  emits: ['get-el-position'],
  methods: {
    startDrag(e) {
      const { target, pageX, pageY } = e;
      const x = target.offsetLeft;
      const y = target.offsetTop;
      this.targetEl = target;
      this.dragginElStartPosition = {x, y};
      this.cursorStartPosition = {x: pageX, y: pageY};
    },
    endDrag(e) {
      const { pageX, pageY } = e;
      const { x: cursorStartPositionX, y: cursorStartPositionY } = this.cursorStartPosition;
      const { x: dragginElStartPositionX, y: dragginElStartPositionY } = this.dragginElStartPosition;
      this.cursorEndPosition = {x: pageX, y: pageY};
      this.offsetX = pageX - cursorStartPositionX;
      this.offsetY = pageY - cursorStartPositionY;
      this.dragginElEndPosition = {
        x: dragginElStartPositionX + this.offsetX , 
        y: dragginElStartPositionY + this.offsetY 
      };
      this.$emit('get-el-position', {
        target: this.targetEl,
        position: this.dragginElEndPosition
      });
    }
  }
}
</script>

<style>
.drag-and-drop-area {
  background: lightgray;
  height: 100%;
  overflow: hidden;
}
</style>