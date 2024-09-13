# Dockerfile
FROM golang:1.11.1-alpine3.8
WORKDIR /app
ADD . /app/
RUN go mod download
RUN go build -o main ./...
CMD ["/app/main"]

