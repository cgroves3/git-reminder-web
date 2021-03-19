package main

import (
	firebase "firebase.google.com/go/v4"
	"fmt"
	"git-reminder/server/api/user"
	"git-reminder/server/firebaseapp"
	"git-reminder/server/middleware"
	log "github.com/sirupsen/logrus"
	"google.golang.org/api/option"
	"net/http"
	"os"
	"path"
	"path/filepath"
)

import "github.com/gorilla/mux"

func getExecutablePath() string {
	executePath, err := os.Executable()
	if err != nil {
		log.Errorf("Unable to get executable path: %s", err)
	}
	// Executable could be a sym link
	executePath, err = filepath.EvalSymlinks(executePath)
	if err != nil {
		log.Errorf("Error evaluating symlinks for executable path")
	}
	return path.Dir(executePath)
}

func getConfigPath() string {
	return path.Join(getExecutablePath(), "configs")
}

func init() {
	// Log as JSON instead of the default ASCII formatter.
	log.SetFormatter(&log.TextFormatter{})

	projectName := "git-reminder"
	logFilePath := path.Join(getExecutablePath(), fmt.Sprintf("%s.log", projectName))
	var file, err = os.OpenFile(logFilePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		fmt.Println(err)
	}
	log.SetReportCaller(true)
	log.SetOutput(file)

	// Only log the warning severity or above.
	log.SetLevel(log.DebugLevel)
}

func main() {
	projectName := "git-reminder"

	var err error

	//Setup database connection
	//var databaseConfigFilePath string
	//usage := "File path of the database configuration used to connect to the database."
	//dbConfigFilePath := path.Join(getConfigPath(), "database.json")
	//flag.StringVar(&databaseConfigFilePath, "databaseConfig", dbConfigFilePath, usage)
	//flag.Parse()
	//databaseConfig, err := database.ReadDbConfig(databaseConfigFilePath)
	//if err != nil {
	//	log.Debugf("Unable to read database configuration: %s", err)
	//}
	//err = databaseConfig.Validate()
	//if err != nil {
	//	log.Debugf("Invalid database configuration: %s", err)
	//}
	//database.InitDb(databaseConfig.ConnectionString())

	// Initialize firebase App
	firebaseOptionPath := path.Join(getConfigPath(), "firebaseApp.json")
	firebaseOption := option.WithCredentialsFile(firebaseOptionPath)
	log.Debug("firebaseOption %v", firebaseOption)
	config := &firebase.Config{
		ProjectID:        "git-reminders",
	}
	firebaseapp.InitApp(config, firebaseOption)

	// Setup server
	router := mux.NewRouter()
	webDir := fmt.Sprintf("%s/web", projectName)
	fileServer := http.FileServer(http.Dir(webDir))

	router.Handle("/api/users", middleware.NewLogger(user.NewUserHandler()))
	router.Handle("/", fileServer)
	port := ":8080"
	server := http.Server{
		Addr:              port,
		Handler:           router,
		TLSConfig:         nil,
		ReadTimeout:       0,
		ReadHeaderTimeout: 0,
		WriteTimeout:      0,
		IdleTimeout:       0,
		MaxHeaderBytes:    0,
		TLSNextProto:      nil,
		ConnState:         nil,
		ErrorLog:          nil,
		BaseContext:       nil,
		ConnContext:       nil,
	}
	err = server.ListenAndServe()
	if err != nil {
		log.Warnf("Unable to listen and serve: %s", err)
	}
}
