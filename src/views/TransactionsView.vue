<template>
  <div class="transactionss">
    <h1>Bitcoin Transactions</h1>
    <transactions-actions
      @start="start"
      @stop="stop"
      @reset="reset"
    />
    <transactions-sum
      v-if="transactions.length" 
      :sum="sum"
    />
    <transactions-table
      v-if="transactions.length" 
      :transactions="transactions"
    />
  </div>
</template>

<script>
import { formatTransactionData } from '@/utils/transactions';
import TransactionsService from '@/services/TransactionsService';
import TransactionsActions from '@/components/transactions/TransactionsActions';
import TransactionsSum from '@/components/transactions/TransactionsSum';
import TransactionsTable from '@/components/transactions/TransactionsTable';

export default {
  name: 'TransactionsView',
  components: {
    'transactions-actions': TransactionsActions,
    'transactions-sum': TransactionsSum,
    'transactions-table': TransactionsTable
  },
  data() {
    return {
      transactions: []
    }
  },
  beforeDestroy() {

  },
  async created() {
    this.service = new TransactionsService();
    await this.service.connect();
  },
  computed: {
    sum() {
      return this.transactions.reduce((fullSum, { sum }) => fullSum + sum, 0);
    }
  },
  methods: {
    start() {
      this.service.subscribe();
      this.service.getTransaction(this.addTransaction);
    },
    stop() {
      this.service.unsubscribe();
    },
    reset() {
      this.transactions = [];
    },
    addTransaction(data) {
      const formattedData = formatTransactionData(data);
      this.transactions = [...this.transactions, formattedData];
    }
  }
}
</script>

<style scoped>
  
</style>
