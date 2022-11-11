import WebSocketAPI from "@/API/WebSocketAPI";

export default class TransactionsService {
  #url = 'wss://ws.blockchain.info/inv';
  #websocket = null;

  constructor() {
    this.#websocket = new WebSocketAPI(this.#url);
  }

  async connect() {
    return await this.#websocket.connect();
  }

  close() {
    this.#websocket.close();
  }

  subscribe() {
    this.#websocket.send({
      "op": "unconfirmed_sub"
    });
  }

  unsubscribe() {
    this.#websocket.send({
      "op": "unconfirmed_unsub"
    });
  }

  async getTransaction(callback) {
    this.#websocket.onMessage(callback); 
  }

  async getAlert(callback) {
    this.#websocket.onClose(callback);
    this.#websocket.onError(callback);
  }
}