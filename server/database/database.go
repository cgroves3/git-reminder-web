package database

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	_ "github.com/lib/pq"
	log "github.com/sirupsen/logrus"
	"os"
)

var (
	Db *sql.DB
)

func InitDb(connectionString string) error{
	if len(connectionString) == 0 {
		return errors.New("argument connection string was empty")
	}
	log.Debugf("Opening database...")
	var err error
	Db, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Debugf("Unable to open database with the connection string=%s", err)
		return err
	}
	Db.SetMaxOpenConns(100)
	Db.SetConnMaxLifetime(3600)
	log.Debugf("Database opened.")
	err = Db.Ping()
	if err != nil {
		log.Fatalf("Error pinging database: %s", err)
		return err
	}
	return nil
}

type DatabaseConfiguration struct {
	Host     string `json:"host"`
	Port     int    `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	Database string `json:"database"`
	SslMode string `json:"sslmode"`
}

func (databaseConfig *DatabaseConfiguration) ConnectionString() string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		databaseConfig.Host, databaseConfig.Port, databaseConfig.User, databaseConfig.Password, databaseConfig.Database, databaseConfig.SslMode)
}

func (databaseConfig *DatabaseConfiguration) Validate() error {
	notSpecifiedMsg :="parameter was not specified"
	if len(databaseConfig.Host) == 0 {
		return errors.New(fmt.Sprintf("host %s", notSpecifiedMsg))
	}
	if len(databaseConfig.Database) == 0 {
		return errors.New(fmt.Sprintf("database %s", notSpecifiedMsg))
	}
	if len(databaseConfig.User) == 0 {
		return errors.New(fmt.Sprintf("user %s", notSpecifiedMsg))
	}
	if len(databaseConfig.Password) == 0 {
		return errors.New(fmt.Sprintf("password %s", notSpecifiedMsg))
	}
	if len(databaseConfig.SslMode) == 0 {
		return errors.New(fmt.Sprintf("sslmode %s", notSpecifiedMsg))
	}
	return nil
}

func StartTransaction() (*sql.Tx, error) {
	tx, err := Db.Begin()
	if err != nil {
		log.Debugf("Unable to start database transaction: %s", err)
		return nil, err
	}
	return tx, nil
}

func ReadDbConfig(filePath string) (DatabaseConfiguration, error) {
	var dbConfig DatabaseConfiguration
	if len(filePath) == 0 {
		log.Debugf("Argument filePath was empty.")
		return dbConfig, errors.New("Argument filePath was empty.")
	}
	dbConfigFile := filePath
	f, err := os.Open(dbConfigFile)
	if err != nil {
		errorMsg := fmt.Sprintf("Error opening %s:\n %s", dbConfigFile, err)
		log.Fatalf(errorMsg)
		log.Fatalf(errorMsg)
		return dbConfig, errors.New(errorMsg)
	}
	err = json.NewDecoder(f).Decode(&dbConfig)
	if err != nil {
		errorMsg := fmt.Sprintf("Error decoding %s:\n %s", dbConfigFile, err)
		log.Fatalf(errorMsg)
		log.Fatalf(errorMsg)
		return dbConfig, errors.New(errorMsg)
	}
	err = f.Close()
	if err != nil {
		errorMsg := fmt.Sprintf("Error closing %s:\n %s", dbConfigFile, err)
		log.Fatalf(errorMsg)
		log.Fatalf(errorMsg)
		return dbConfig, errors.New(errorMsg)
	}
	return dbConfig, nil
}