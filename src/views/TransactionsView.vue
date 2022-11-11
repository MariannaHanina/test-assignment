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
    <modal-dialog v-show="!!alerts.length" @close="closeModal">
      <template #header>
        Blockchain Connection Alerts
      </template>
      <div>
        <div v-for="{id, type, message} in alerts" :key="id">
          {{type}}: {{message}}
        </div> 
      </div>
    </modal-dialog>
  </div>
</template>

<script>
import { formatTransactionData } from '@/utils/transactions';
import TransactionsService from '@/services/TransactionsService';
import TransactionsActions from '@/components/transactions/TransactionsActions';
import TransactionsSum from '@/components/transactions/TransactionsSum';
import TransactionsTable from '@/components/transactions/TransactionsTable';
import ModalDialog from '@/components/ui/ModalDialog';

export default {
  name: 'TransactionsView',
  components: {
    'transactions-actions': TransactionsActions,
    'transactions-sum': TransactionsSum,
    'transactions-table': TransactionsTable,
    'modal-dialog': ModalDialog
  },
  data() {
    return {
      transactions: [],
      alerts: [],
      sum: 0
    }
  },
  async created() {
    this.service = new TransactionsService();
    await this.service.connect();
    window.addEventListener('beforeunload', this.service.close);
  },
  methods: {
    start() {
      this.service.subscribe();
      this.service.getTransaction(this.addTransaction);
      this.service.getAlert(this.addAlert);
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
      this.sum += formattedData.sum;
    },
    addAlert(alertMessage) {
      this.alerts = [...this.alerts,  {...alertMessage, id: Date.now()}];
    },
    closeModal() {
      this.alerts = [];
    }
  }
}
</script>

<style scoped>
  
</style>
