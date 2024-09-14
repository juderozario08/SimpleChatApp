const socket = new WebSocket("ws://localhost:8080/ws")

/**
 * @param {(msg: string) => void} cb
 * @param {(msg: string) => void} assignName
 */
const connect = (cb, assignName) => {
    console.log("Connecting ...")
    socket.onopen = () => {
        console.log("Successfully Connected")
    }
    socket.onmessage = msg => {
        console.log("Received message:", msg);
        try {
            let data = JSON.parse(msg.data);
            if (data.Type === 0) {
                assignName(data.Name);
            }
            cb(msg);
        } catch (e) {
            console.error("Failed to parse message:", msg.data);
            return;
        }
    }
    socket.onclose = event => {
        console.log("Socket closed connection: ", event)
    }
    socket.onerror = err => {
        console.log("Socket error: ", err)
    }
}

/**
 * @param {string} msg
 */
const sendMessage = (msg) => {
    console.log("Sending msg: ", msg)
    socket.send(msg)
}

export { sendMessage, connect }
