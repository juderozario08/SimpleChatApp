const socket = new WebSocket("ws://localhost:8080/ws")

/**
 * @param {(msg: string) => void} cb
 */
const connect = cb => {
    console.log("Connecting ...")
    socket.onopen = () => {
        console.log("Successfully Connected")
    }
    socket.onmessage = msg => {
        console.log(msg)
        cb(msg)
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
