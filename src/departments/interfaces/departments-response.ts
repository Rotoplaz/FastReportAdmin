export interface DepartmentsResponse {
    limit:         number;
    page:          number;
    numberOfPages: number;
    count:         number;
    data:          Department[];
}

export interface Department {
    id:          string;
    name:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    supervisor:  Supervisor | null;
}

export interface Supervisor {
    id:        string;
    firstName: string;
    lastName:  string;
    email:     string;
    role:      string;
}
