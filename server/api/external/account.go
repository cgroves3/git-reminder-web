package external

import (
	"encoding/json"
	"firebase.google.com/go/v4/auth"
	"git-reminder/server/data"
	"git-reminder/server/database"
	"git-reminder/server/jsonerror"
	"git-reminder/server/middleware"
	log "github.com/sirupsen/logrus"
	"net/http"
)

type LinkedAccountHandler struct{}

func (aH *LinkedAccountHandler) ServeHttp(w http.ResponseWriter, r *http.Request) {
	var token auth.Token
	authHandler := middleware.AuthHandler{}
	tokenHeader := r.Header.Get(authHandler.GetTokenHeader())
	w.Header().Set("Content-Type", "application/json")
	err := json.Unmarshal([]byte(tokenHeader), token)
	if err != nil {
		log.Warn("Unable to unmarshal token to string")
		w.WriteHeader(http.StatusInternalServerError)
		errMsg := jsonerror.Error{ErrorMessage: "unable to get user from token."}
		json.NewEncoder(w).Encode(errMsg)
		return
	}
	switch (r.Method) {
	case http.MethodGet:
		accounts, err := aH.GetAccounts(token.UID)
		if err != nil {
			log.Warnf("Unable to execute query=%s", err)
			w.WriteHeader(http.StatusInternalServerError)
			errMsg := jsonerror.Error{ErrorMessage: "unable to get linked accounts."}
			json.NewEncoder(w).Encode(errMsg)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(&data.LinkedAccounts{LinkedAccounts: *accounts})
	}
}

func (aH *LinkedAccountHandler) GetAccounts(userId string) (*[]data.LinkedAccount, error) {
	//Get existing linked accounts
	query := "select user_id, integration_id, user_login, avatar_url from get_linked_accounts($1)"
	var accounts []data.LinkedAccount
	err := database.Db.Select(&accounts, query, userId)
	if err != nil {
		return &[]data.LinkedAccount{}, err
	}
	return &accounts, nil
}

