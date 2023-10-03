// CRUD operations using structs and slices...
package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type User struct {
	FullName string `json:"fullname"`
}

var users []User

var ErrUserNotFound = errors.New("user not found")

func getUsers(b http.ResponseWriter, a *http.Request) {
	b.Header().Set("Content-Type", "application/json")
	json.NewEncoder(b).Encode(users)
}
func createUser(b http.ResponseWriter, a *http.Request) {
	b.Header().Set("Content-Type", "application/json")
	var user User
	_ = json.NewDecoder(a.Body).Decode(&user)
	users = append(users, user)
	json.NewEncoder(b).Encode(user)

}
func updateUser(b http.ResponseWriter, a *http.Request) {
	b.Header().Set("Content-Type", "application/json")
	params := mux.Vars(a)
	userFound := false
	for index, item := range users {
		if item.FullName == params["fullname"] {
			users = append(users[:index], users[index+1:]...)
			var user User
			_ = json.NewDecoder(a.Body).Decode(&user)
			user.FullName = params["fullname"]
			users = append(users, user)
			json.NewEncoder(b).Encode(user)
			userFound = true

			return

		}

		if !userFound {
			http.Error(b, "could not find user or deleted", http.StatusNotFound)
		}
	}
}

func deleteUser(b http.ResponseWriter, a *http.Request) {
	b.Header().Set("Content-Type", "application/json")
	params := mux.Vars(a)
	employeeFound := false
	for index, item := range users {
		if item.FullName == params["fullname"] {
			users = append(users[:index], users[index+1:]...)
			json.NewEncoder(b).Encode(users)
			employeeFound = true
			return
		}
		if !employeeFound {
			http.Error(b, "could not find user or deleted", http.StatusNotFound)
			fmt.Println(http.Error)
		}
	}
}

func getUser(b http.ResponseWriter, a *http.Request) {
	b.Header().Set("Content-Type", "application/json")
	params := mux.Vars(a)
	for _, item := range users {
		if item.FullName == params["fullname"] {
			json.NewEncoder(b).Encode(item)
			return
		}
	}
}

func main() {
	fmt.Println(("crud operations....."))

	a := mux.NewRouter()

	users = append(users, User{FullName: "qwertyuiop"})
	users = append(users, User{FullName: "abcdef"})
	users = append(users, User{FullName: "xyx"})

	//routes
	a.HandleFunc("/users", getUsers).Methods("GET")
	a.HandleFunc("/users/{fullname}", getUser).Methods("GET")
	a.HandleFunc("/users", createUser).Methods("POST")
	a.HandleFunc("/users/{fullanme}", updateUser).Methods("PUT")
	a.HandleFunc("/employees/{fullanme}", deleteUser).Methods("DELETE")

	fmt.Printf("starting server at port 1357\n")
	log.Fatal(http.ListenAndServe(":1357", a))

}
