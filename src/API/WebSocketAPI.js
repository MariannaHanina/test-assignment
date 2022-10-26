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
          this.onClose();
          this.onError();
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

  onClose() {
    this.#socket.onclose = (e) => {
      let message;

      if (e.wasClean) {
        message = 'Соединение закрыто чисто';
      } else {
        message = 'Обрыв соединения';
      }

      console.log(`Code: ${e.code} cause: ${e.reason}`);
      alert(message);
    };
  }

  onError() {
    this.#socket.onerror = (error) => {
      alert('Ошибка ' + error.message);
    }
  }
}