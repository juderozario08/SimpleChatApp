package main

import (
	"fmt"
	"log"
	"net/http"

	"SimpleChatApp/websocket"
)

func serveWebSocket(p *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}
	// Once connection upgraded for the particular client
	// Create the Client struct and define which pool the client is a part of
	client := &websocket.Client{
		Conn: conn,
		Pool: p,
		Name: fmt.Sprintf("guest%v", len(p.Clients)),
	}
	// Then register the client to the pool
	p.Register <- client
	client.Read() // Read data constantly
}

func setupRoutes() {
	// Create and start the new pool using a goroutine
	p := websocket.NewPool()
	go p.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWebSocket(p, w, r)
	})
}

func main() {
	fmt.Println("Chat APP")
	setupRoutes()
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Println(err)
	}
}
