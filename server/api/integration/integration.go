package integration

import (
	"encoding/json"
	"git-reminder/server/data"
	"git-reminder/server/database"
	"git-reminder/server/jsonerror"
	log "github.com/sirupsen/logrus"
	"net/http"
)

type IntegrationHandler struct{}

func NewIntegrationHandler() *IntegrationHandler {
	return &IntegrationHandler{}
}

func (iH *IntegrationHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//Get existing linked accounts
	w.Header().Set("Content-Type", "application/json")
	switch r.Method {
	case http.MethodGet:
		integrations, err := iH.getIntegrations()
		log.Debugf("integrations=%v", integrations)
		if err != nil {
			log.Warnf("Error getting integrations=%s", err)
			w.WriteHeader(http.StatusInternalServerError)
			errMsg := jsonerror.Error{ErrorMessage: "unable to get user from token."}
			json.NewEncoder(w).Encode(errMsg)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(&data.Integrations{Integrations: *integrations})
	}
}

func (iH *IntegrationHandler) getIntegrations() (*[]data.Integration, error) {
	//Get existing linked accounts
	query := "select integration_id, integration from get_integrations()"
	var integrations []data.Integration
	err := database.Db.Select(&integrations, query)
	if err != nil {
		return &[]data.Integration{}, err
	}
	return &integrations, nil
}