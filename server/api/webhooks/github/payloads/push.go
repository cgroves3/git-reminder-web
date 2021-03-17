package payloads

import "git-reminder/server/api/webhooks/github"

type PushPayload struct {
	Ref     string          `json:"ref"`
	Before  string          `json:"before"`
	After   string          `json:"after"`
	Commits []github.Commit `json:"Commits"`
}
