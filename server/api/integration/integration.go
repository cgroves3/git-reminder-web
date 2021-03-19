package integration

import (
	"encoding/json"
	"firebase.google.com/go/v4/auth"
	"git-reminder/server/data"
	"git-reminder/server/database"
	"git-reminder/server/middleware"
	"git-reminder/server/jsonerror"
	log "github.com/sirupsen/logrus"
	"net/http"
)

type IntegrationHandler struct{}

func (i *IntegrationHandler) ServeHttp(w http.ResponseWriter, r *http.Request) {
	//Get existing linked accounts
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
	query := "select integration_id, integration from get_integration()"
	var integrations []data.Integration
	database.Db.Select(integrations, query)
	if err != nil {
		log.Warnf("Unable to execute query=%s", query)
		w.WriteHeader(http.StatusInternalServerError)
		errMsg := jsonerror.Error{ErrorMessage: "unable to get user from token."}
		json.NewEncoder(w).Encode(errMsg)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&data.Integrations{Integrations: integrations})
}