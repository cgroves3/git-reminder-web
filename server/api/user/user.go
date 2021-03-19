package user

import (
	"git-reminder/server/data"
	syserror "git-reminder/server/jsonerror"
	"git-reminder/server/firebaseapp"
	"encoding/json"
	"firebase.google.com/go/v4/auth"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"io/ioutil"
	"net/http"
)

type UserHandler struct {
	handler http.Handler
}

func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

func (uH *UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var user data.User
		err := json.NewDecoder(r.Body).Decode(&user)
		w.Header().Set("Content-Type", "application/json")
		log.Debugf("Received %s", user)
		if err != nil {
			requestBody, _ := ioutil.ReadAll(r.Body)
			log.Debugf("unable to decode user from %s", string(requestBody))
			w.WriteHeader(http.StatusBadRequest)
			errMsg := syserror.Error{
				ErrorMessage: "unable to decode user",
			}
			json.NewEncoder(w).Encode(errMsg)
			return
		}
		userRecord, createUserErr := createUser(user, r.Context())
		if createUserErr != nil {
			log.Debugf("error creating user: %v\n", createUserErr)
			w.WriteHeader(http.StatusInternalServerError)
			errMsg := syserror.Error{
				ErrorMessage: "error creating user",
			}
			json.NewEncoder(w).Encode(errMsg)
			return
		}
		log.Debugf("Successfully created user: %v\n", userRecord)
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(user)
	}
}

func createUser(user data.User, context context.Context) (*auth.UserRecord, error) {
	// Get an auth client from the firebaseapp.App
	client, err := firebaseapp.FirebaseApp.Auth(context)
	log.Debug("auth client created.")
	if err != nil {
		log.Debug("unable to create auth client.")
	}
	params := (&auth.UserToCreate{}).
		Email(user.Email).
		EmailVerified(false).
		Password(user.Password).
		DisplayName(user.DisplayName).
		Disabled(false)
	return client.CreateUser(context, params)
}