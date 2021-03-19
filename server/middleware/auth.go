package middleware

import (
	"git-reminder/server/data"
	"git-reminder/server/firebaseapp"
	"git-reminder/server/jsonerror"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"net/http"
	"strings"
)


type AuthHandler struct {
	handler http.Handler
}

func (aH *AuthHandler) GetTokenHeader() string {
	return "user-token"
}

func (aH *AuthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var supportedAuthSchemes []string
	supportedAuthSchemes = append(supportedAuthSchemes, "Bearer")
	client, err := firebaseapp.FirebaseApp.Auth(context.Background())
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}

	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(jsonerror.Error{ErrorMessage: "Missing Authorization header"})
	}
	splitHeader := strings.Split(authHeader, " ")
	scheme := splitHeader[0]
	if data.IsIn(scheme, supportedAuthSchemes) {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(jsonerror.Error{ErrorMessage: "Unsupported authorization scheme"})
	}
	jwtToken := splitHeader[1]
	token, err := client.VerifyIDToken(context.Background(), jwtToken)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(jsonerror.Error{ErrorMessage: "Access Forbidden"})
	}
	jsonToken, err := json.Marshal(token)
	if err != nil {
		log.Debugf("unable to convert jwt token into json.")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(jsonerror.Error{ErrorMessage: "Access Forbidden"})
	}
	r.Header.Set(aH.GetTokenHeader(), string(jsonToken))
}