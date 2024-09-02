package websocket

import (
	"fmt"
	"log"
)

// A Pool is going to be able to register, Unregister clients, have a
// list of clients and be able to broadcast the message to a specific pool
type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (p *Pool) Start() {
	for {
		select {
		case client := <-p.Register:
			p.Clients[client] = true
			fmt.Println("Size of connection pool: ", len(p.Clients))
			for client := range p.Clients {
				if err := client.Conn.WriteJSON(Message{
					Type: 1,
					Body: "New user has entered...",
				}); err != nil {
					log.Println(err)
					return
				}
			}
		case client := <-p.Unregister:
			delete(p.Clients, client)
			fmt.Println("Size of connection pool: ", len(p.Clients))
			for client := range p.Clients {
				if err := client.Conn.WriteJSON(Message{Type: 1, Body: "User disconnected..."}); err != nil {
					log.Println(err)
					return
				}
			}
		case message := <-p.Broadcast:
			fmt.Println("Send the message to all clients")
			for client := range p.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					log.Println(err)
					return
				}
			}
		}
	}
}
