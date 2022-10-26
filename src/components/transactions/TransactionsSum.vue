<template>
  <div class="transactions-sum">
    Сумма: {{ sum | BTC }} 
  </div>
</template>

<script>
  export default {
    name: 'TransactionsSum',
    props: {
      sum: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style>
.transactions-sum {
  font-size: 1.1rem;
  text-align: center;
  
  margin-top: 50px;
}
</style>