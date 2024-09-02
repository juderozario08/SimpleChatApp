package websocket

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

// Each client is going to have an ID, a Connection and a Pool associated with them
type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
}

// The Message struct is just going to show what the messageType is and what the message is
type Message struct {
	Type int    `json: "type"`
	Body string `json: "body"`
}

// This is a read function which is attached to the Client.
// Simply, every client would be constantly reading from
// the connection to show the data on the client side
// Once the reading is done, the client must be disconnected
func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()
	for {
		msgType, msg, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
		}
		c.Pool.Broadcast <- Message{Type: msgType, Body: string(msg)}
		fmt.Println("Message Received")
	}
}
