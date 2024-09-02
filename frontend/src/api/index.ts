const socket = new WebSocket("ws://localhost:8080/ws");
const connect = () => {
    console.log("Connecting ...");
    socket.onopen = () => {
        console.log("Connected to websocket at port 8080");
    };
    socket.onclose = (event) => {
        console.log("Closed connection: ", event);
    };
    socket.onmessage = (message) => {
        console.log("Message received: ", message);
    };
    socket.onerror = (error) => {
        console.log("Error: ", error);
    };
};

const sendMessage = (message: any) => {
    socket.send(message);
    console.log("Message Sent");
};

export { connect, sendMessage };
