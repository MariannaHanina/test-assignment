<template>
<div class="modal-dialog">
  <div class="modal-dialog-header">
    <h2 class="modal-dialog-header-title">
      <slot name="header" />
    </h2>
    <button
      class="modal-dialog-header-button"
      type="button"
      @click="closeClick"
    >
      &times;
    </button>
  </div>
  <div class="modal-dialog-content">
    <slot />
  </div>
</div>
</template>

<script>
  export default {
    name: 'ModalDialog',
    emits: ['close'],
    methods: {
      closeClick() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
.modal-dialog {
  background: white;
  border: 1px solid grey;
  border-radius: 5px;
  box-shadow: 2.5px 2.5px 5px rgb(0, 0, 0, 0.25);

  width: 30vw;
  min-height: 50vh;

  position: fixed;
  top: 15%;
  left: calc(50% - 15vw);
  
  z-index: 100;
}
.modal-dialog-header {
  border-bottom: 1px solid grey;
  position: relative;
  padding: 20px;
}
.modal-dialog-header-title {
  margin: 0;

  text-align: center;
}
.modal-dialog-header-button {
  position: absolute;
  right: 15px;
  top: 20px;
}
.modal-dialog-content {
  padding: 20px;
  text-align: center;
}
</style>