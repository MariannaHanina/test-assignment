<template>
  <table class="transaction-table">
    <thead>
      <tr>
        <th class="transaction-table-th">From</th>
        <th class="transaction-table-th">To</th>
        <th class="transaction-table-th">Sum</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="({from, to, sum}, tindex) in transactions" :key="`trns-${tindex}`">
        <td class="transaction-table-td">
          <div v-for="(address, aindex) in from" :key="`frmadd-${aindex}`">{{address}}</div>
        </td>
        <td class="transaction-table-td">
          <div v-for="(address, aindex) in to" :key="`toadd-${aindex}`">{{address}}</div>
        </td>
        <td class="transaction-table-td">{{sum | BTC}} </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
export default {
  name: 'TransactionsTable',
  props: {
    transactions: {
      type: Array, 
      required: true
    }
  }
}
</script>

<style scoped>
.transaction-table {
  border-collapse: inherit;
  border-spacing: 0;

  margin: 30px auto;
  width: 90vw;
}
.transaction-table-td,
.transaction-table-th{
  border: 1px solid gray;
  padding: 20px;

  text-align: center;
}

</style>