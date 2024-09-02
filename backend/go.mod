module SimpleChatApp

go 1.22.5

replace SimpleChatApp/pkg/websocket => ./pkg/websocket

require SimpleChatApp/websocket v0.0.0-00010101000000-000000000000

require github.com/gorilla/websocket v1.5.3 // indirect

replace SimpleChatApp/websocket => ./pkg/websocket
