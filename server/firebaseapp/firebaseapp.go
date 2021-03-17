package firebaseapp

import (
	firebase "firebase.google.com/go/v4"
	"fmt"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
)

var FirebaseApp *firebase.App

func InitApp(config *firebase.Config, opts option.ClientOption) {
	var err error
	if FirebaseApp == nil {
		FirebaseApp, err = firebase.NewApp(context.Background(), config, opts)
	}
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	log.Debugf(fmt.Sprintf("firebase initialized successfully %v with config %v", FirebaseApp, config))
}