package middleware

import (
	"git-reminder/server/firebaseapp"
	"git-reminder/server/error"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"net/http"
	"strings"
)


type AuthHandler struct {
	handler http.Handler
}

func isIn(target string, array []string) bool {
	for _, data := range array {
		if data == target {
			return true
		}
	}
	return false
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
		json.NewEncoder(w).Encode(error.JsonError{ErrorMessage: "Missing Authorization header"})
	}
	splitHeader := strings.Split(authHeader, " ")
	scheme := splitHeader[0]
	if isIn(scheme, supportedAuthSchemes) {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(error.JsonError{ErrorMessage: "Unsupported authorization scheme"})
	}
	jwtToken := splitHeader[1]
	token, err := client.VerifyIDToken(context.Background(), jwtToken)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(error.JsonError{ErrorMessage: "Access Forbidden"})
	}
	jsonToken, err := json.Marshal(token)
	if err != nil {
		log.Debugf("unable to convert jwt token into json.")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(error.JsonError{ErrorMessage: "Access Forbidden"})
	}
	r.Header.Set("user-token", string(jsonToken))
}