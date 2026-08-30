const WS_URL = import.meta.env.VITE_WS_URL;

let socket = null;

let reconnectTimer = null;

let messageHandler = null;

let openHandler = null;

let closeHandler = null;

let intentionalClose = false;

const connect = () => {
  console.log("Connecting websocket");

  socket = new WebSocket(WS_URL);

  socket.addEventListener("open", () => {
    console.log("Websocket connected");

    joinAllRooms();

    if (openHandler) {
      openHandler();
    }
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (messageHandler) {
      messageHandler(message);
    }
  });

  socket.addEventListener("close", () => {
    console.log("Websocket disconnected");

    if (closeHandler) {
      closeHandler();
    }

    if (!intentionalClose) {
      reconnect();
    }
  });

  socket.addEventListener("error", (error) => {
    console.error("Websocket error", error);
  });
};

const reconnect = () => {
  if (reconnectTimer) {
    return;
  }

  console.log("Attempting to reconnect in 3 seconds");

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, 3000);
};

export const startWebsocket = (onMessage, onOpen, onClose) => {
  intentionalClose = false;

  messageHandler = onMessage;
  openHandler = onOpen;
  closeHandler = onClose;

  connect();
};

export const stopWebSocket = () => {
  intentionalClose = true;

  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  if (socket) {
    socket.close();
    socket = null;
  }
};