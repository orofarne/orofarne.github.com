package main

import (
	"net/http"
	"fmt"
)

func SayHelloWorld(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, World!")
}

func SayHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello!")
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", SayHelloWorld)
	mux.HandleFunc("/hello", SayHello)

	http.ListenAndServe(":8080", mux)
}
