export default class WebSocketAPI {
  #socket = null;

  constructor(url) {
    this.url = url;
  }

  connect() {
    this.#socket = new WebSocket(this.url);

    return new Promise((resolve, reject) => {
      this.#socket.onopen = () => {
        if (this.#socket.readyState === 1) {
          resolve('connected');
        }
        reject('rejected');
      };
    });
  }

  send(message) {
    const messageJSON = JSON.stringify(message);
    this.#socket.send(messageJSON);
  }

  onMessage(callback) {
    this.#socket.onmessage = (e) => {
      if (e.data) {
        const data = JSON.parse(e.data);
        callback(data);
      }
    }
  }

  onClose(callback) {
    this.#socket.onclose = (e) => {
      let message;

      if (e.wasClean) {
        message = 'Connection closed cleanly';
      } else {
        message = 'Connection failure';
      }

      console.log(`Code: ${e.code} cause: ${e.reason}`);
      callback({
        type: 'close',
        message
      });
    };
  }

  onError(callback) {
    this.#socket.onerror = (error) => {
      callback({
        type: 'error',
        message: error.message
      })
    }
  }
}