<template>
  <div
    class="drag-and-drop-area"
    @drag="drag"
    @dragstart="startDrag"
    @dragend="endDrag"
    @dragover.prevent 
    @dragenter.prevent
    ref="container"
  > 
    <slot />
  </div>
</template>

<script>
import { getSteppedPosition } from '@/utils/dragAndDrop';

export default {
  name: 'DragAndDropArea',
  data() {
    return {
      containerEl: null,
      targetEl: null,
      dragginElStartPosition: null,
      dragginElEndPosition: null,
      cursorStartPosition: null,
      cursorEndPosition: null,
    }
  },
  emits: ['el-end-drag', 'el-drag'],
  mounted() {
    this.containerEl = this.$refs['container'];
  },
  methods: {
    startDrag(e) {
      const { target, pageX, pageY } = e;
      const x = target.offsetLeft;
      const y = target.offsetTop;
      this.targetEl = target;
      this.dragginElStartPosition = {x, y};
      this.cursorStartPosition = {x: pageX, y: pageY};
      e.dataTransfer.setDragImage(e.target, window.outerWidth, window.outerHeight);
    },
    endDrag(e) {
      const { pageX, pageY } = e;
      this.cursorEndPosition = {x: pageX, y: pageY};
      this.dragginElEndPosition = this.calcElPosition(pageX, pageY);
      this.$emit('el-end-drag', {
        target: this.targetEl,
        position: this.dragginElEndPosition
      });
    },
    drag(e) {
      const { pageX, pageY } = e;

      this.$emit('el-drag', {
        target: this.targetEl,
        position: this.calcElPosition(pageX, pageY)
      });
    },
    calcElPosition(pageX, pageY) {
      const { x: cursorStartPositionX, y: cursorStartPositionY } = this.cursorStartPosition;
      const { x: dragginElStartPositionX, y: dragginElStartPositionY } = this.dragginElStartPosition;
      const offsetX = pageX - cursorStartPositionX;
      const offsetY = pageY - cursorStartPositionY;
      const elXPosition = dragginElStartPositionX + offsetX;
      const elYPosition = dragginElStartPositionY + offsetY;
      const { offsetWidth: elWidth, offsetHeight: elHeight } = this.targetEl;
      const { clientWidth: containerWidth, clientHeight: containerHeight} = this.containerEl;
      const { steppedX, steppedY } = getSteppedPosition(elXPosition, elYPosition);

      let x, y;
      if (steppedX < 0) x = 0;
      else if ((steppedX + elWidth) > containerWidth ) x = containerWidth - elWidth;
      else x = steppedX;

      if (steppedY < 0) y = 0;
      else if ((steppedY + elHeight) > containerHeight ) y = containerHeight - elHeight;
      else y = steppedY;

      return {
        x, 
        y
      };
    }
  }
}
</script>

<style>
.drag-and-drop-area {
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>