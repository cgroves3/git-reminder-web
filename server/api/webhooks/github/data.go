package github

type UserInfo struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type User struct {
	Login             string `json:"login"`
	Id                int    `json:"id"`
	NodeId            string `json:"node_id"`
	AvatarUrl         string `json:"avatar_url"`
	GravatarId        string `json:"gravatar_id"`
	Url               string `json:"url"`
	HtmlUrl           string `json:"html_url"`
	FollowersUrl      string `json:"followers_url"`
	FollowingUrl      string `json:"following_url"`
	GistsUrl          string `json:"gists_url"`
	StarredUrl        string `json:"starred_url"`
	SubscriptionsUrl  string `json:"subscriptions_url"`
	OrganizationsUrl  string `json:"organization_url"`
	ReposUrl          string `json:"repos_url"`
	EventsUrl         string `json:"events_url"`
	ReceivedEventsUrl string `json:"received_events_url"`
	Type              string `json:"type"`
	SiteAdmin         string `json:"site_admin"`
}

type Repository struct {
	Id       int    `json:"id"`
	NodeId   string `json:"node_id"`
	Name     string `json:"name"`
	FullName string `json:"full_name"`
	Private  bool   `json:"private"`
	Sender   User   `json:"sender"`
}

type Plan struct {
	Name         string `json:"name"`
	Space        int    `json:"space"`
	PrivateRepos int    `json:"private_repos"`
}

type Organization struct {
	Login                                string `json:"login"`
	Id                                   int    `json:"id"`
	NodeId                               string `json:"node_id"`
	Url                                  string `json:"url"`
	ReposUrl                             string `json:"repos_url"`
	EventsUrl                            string `json:"events_url"`
	IssuesUrl                            string `json:"issues_url"`
	MembersUrl                           string `json:"members_url"`
	PublicMembersUrl                     string `json:"public_members_url"`
	AvatarUrl                            string `json:"avatar_url"`
	Description                          string `json:"description"`
	Name                                 string `json:"name"`
	Company                              string `json:"company"`
	Blog                                 string `json:"blog"`
	Location                             string `json:"location"`
	Email                                string `json:"email"`
	TwitterUsername                      string `json:"twitter_username"`
	IsVerified                           bool   `json:"is_verified"`
	HasOrganizationProjects              bool   `json:"has_organization_projects"`
	HasRepositoryProjects                bool   `json:"has_repository_projects"`
	PublicRepos                          int    `json:"public_repos"`
	PublicGists                          int    `json:"public_gists"`
	Followers                            int    `json:"followers"`
	Following                            int    `json:"following"`
	HtmlUrl                              string `json:"html_url"`
	CreatedAt                            string `json:"created_at"`
	UpdatedAt                            string `json:"updated_at"`
	Type                                 string `json:"type"`
	TotalPrivateRepos                    int    `json:"total_private_repos"`
	OwnedPrivateRepos                    int    `json:"owned_private_repos"`
	PrivateGists                         int    `json:"private_gists"`
	DiskUsage                            int    `json:"disk_usage"`
	Collaborators                        int    `json:"collaborators"`
	BillingEmail                         string `json:"billing_email"`
	Plan                                 Plan   `json:"plan"`
	DefaultRepositoryPermission          string `json:"default_repository_permission"`
	MembersCanCreateRepositories         bool   `json:"members_can_create_repositories"`
	TwoFactorRequirementEnabled          bool   `json:"two_factor_requirement_enabled"`
	MembersCanCreatePublicRepositories   bool   `json:"members_can_create_public_repositories"`
	MembersCanCreatePrivateRepositories  bool   `json:"members_can_create_private_repositories"`
	MembersCanCreateInternalRepositories bool   `json:"members_can_create_internal_repositories"`
	MembersCanCreatePages                bool   `json:"members_can_create_pages"`
}

type Permission struct {
	Checks   string `json:"checks"`
	MetaData string `json:"meta_data"`
	Contents string `json:"contents"`
}

type Installation struct {
	Id                     int        `json:"id"`
	Account                User       `json:"account"`
	AccessTokensUrl        string     `json:"access_tokens_url"`
	RespositoriesUrl       string     `json:"respositories_url"`
	HtmlUrl                string     `json:"html_url"`
	AppId                  int        `json:"app_id"`
	TargetId               int        `json:"target_id"`
	TargetType             string     `json:"target_type"`
	Permissions            Permission `json:"permissions"`
	Events                 []string   `json:"events"`
	SingleFileName         string     `json:"single_file_name"`
	HasMultipleSingleFiles bool       `json:"has_multiple_single_files"`
	SingleFilePaths        []string   `json:"single_file_paths"`
	RepositorySelection    string     `json:"repository_selection"`
	CreatedAt              string     `json:"created_at"`
	UpdatedAt              string     `json:"updated_at"`
	AppSlug                string     `json:"app_slug"`
}

type Commit struct {
	Id           string       `json:"id"`
	Timestamp    string       `json:"timestamp"`
	Message      string       `json:"message"`
	Author       UserInfo     `json:"author"`
	Url          string       `json:"url"`
	Distinct     bool         `json:"distinct"`
	Added        []string     `json:"added"`
	Modified     []string     `json:"modified"`
	Removed      []string     `json:"removed"`
	Pusher       UserInfo     `json:"pusher"`
	Repository   Repository   `json:"repository"`
	Organization Organization `json:"organization"`
	Installation Installation `json:"installation"`
	Sender       User         `json:"sender"`
}
