package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

/* Create the upgrader Struct with some default values */
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// CheckOrigin is going to be updated later
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

/*
This function has a constant loop that reads messages from the connection constantly
looking for any new messages coming up
*/
func Reader(conn *websocket.Conn) {
	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println(string(message))
		if err := conn.WriteMessage(messageType, message); err != nil {
			log.Println(err)
			return
		}

	}
}

// This upgrades the request to the websocket protocol creating a persistent read time connection
func serveWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	Reader(conn)
}

/*
This function is responsible for setting up all the routes.
The route `/ws` is linked to the serveWebSocket function
*/
func setupRoutes() {
	http.HandleFunc("/", func(res http.ResponseWriter, _ *http.Request) {
		fmt.Fprintf(res, "Simple Hello")
	})
	http.HandleFunc("/ws", serveWebSocket)
}

func main() {
	setupRoutes()
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
