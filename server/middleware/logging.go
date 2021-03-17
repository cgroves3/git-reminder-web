package middleware

import (
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"net/http"
	"time"
)

type Logger struct {
	handler http.Handler
}

//ServeHTTP handles the request by passing it to the real
//handler and logging the request details
func (l *Logger) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	l.handler.ServeHTTP(w, r)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Warnf("unable to read request body.")
	}
	log.Debugf("%s %s %v %s", r.Method, r.URL.Path, time.Since(start), body)
}

//NewLogger constructs a new Logger middleware handler
func NewLogger(handlerToWrap http.Handler) *Logger {
	return &Logger{handlerToWrap}
}