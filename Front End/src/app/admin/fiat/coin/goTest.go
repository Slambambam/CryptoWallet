package main
 
import (
    "fmt"
    "net/http"
)
 
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome, %s!", r.URL.Path[1:])
}
 
func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}