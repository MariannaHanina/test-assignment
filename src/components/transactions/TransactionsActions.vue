<template>
  <div class="transactions-actions">
    <button
      class="button button-start"
      type="button" 
      @click="start"
    >
      Запуск
    </button>
    <button
      class="button button-stop"
      type="button"
      @click="stop"
    >
      Остановка
    </button>
    <button
      class="button button-reset"
      type="button"
      @click="reset"
    >
      Сброс
    </button>
  </div>
</template>

<script>
export default {
  name: 'TransactionsActions',
  emits: ['start', 'stop', 'reset'],
  methods: {
    start() {
      this.$emit('start');
    },
    stop() {
      this.$emit('stop');
    },
    reset() {
      this.$emit('reset');
    }
  }
}
</script>

<style scoped>
.transactions-actions {
  display: flex;
  justify-content: space-around;
}
.button {
  border: 0;
  border-radius: 5px;

  padding: 10px;
  width: 150px;

  color: #fff;
  font-size: 1.1rem;

  cursor: pointer;
}
.button-start {
  background-color: #52b41d;
}
.button-stop {
  background-color: #dd5827;
}

.button-reset {
  background-color: #ddb127;
}
</style>