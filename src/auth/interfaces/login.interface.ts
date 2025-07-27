

export interface LoginResponse {
    user: User;
    jwt:  string;
}

export interface User {
    id:        string;
    firstName: string;
    lastName:  string;
    email:     string;
    code:      string;
    role:      string;
    createdAt: Date;
    updatedAt: Date;
}
