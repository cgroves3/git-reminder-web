package data

type IntegrationType int

const (
	GitHub = iota + 1
)

type LinkedAccount struct {
	UserId        string          `db:"user_id"`
	IntegrationId IntegrationType `db:"integration_id`
	Login         string          `db:"user_login"`
	AvatarUrl     string          `db:"avatar_url"`
}

type LinkedAccounts struct {
	LinkedAccounts []LinkedAccount `json:"linked_accounts"`
}

type User struct {
	Id          string
	DisplayName string `json:"displayName,omitempty"`
	Email       string `json:"email,omitempty"`
	Password    string `json:"password,omitempty"`
}

func (u User) String() string {
	return u.Email + "(" + u.DisplayName + ")"
}

func IsIn(target string, array []string) bool {
	for _, data := range array {
		if data == target {
			return true
		}
	}
	return false
}

type Integration struct {
	Id   IntegrationType `db:"integration_id" json:"id"`
	Name string          `db:"integration" json:"name"`
}

type Integrations struct {
	Integrations []Integration `json:"integrations"`
}

