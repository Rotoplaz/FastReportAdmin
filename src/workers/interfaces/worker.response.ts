export interface WorkersResponse {
    limit:         number;
    page:          number;
    numberOfPages: number;
    count:         number;
    data:          Worker[];
}
export interface Worker {
    id:               string;
    firstName:        string;
    lastName:         string;
    email:            string;
    code:             string;
    role:             Role;
    createdAt:        Date;
    updatedAt:        Date;
    workerDepartment: WorkerDepartment | null;
    department:       Department | null;
}

export interface Department {
    id:           string;
    name:         string;
    description:  string;
    supervisorId: string;
    createdAt:    Date;
    updatedAt:    Date;
}

export enum Role {
    Supervisor = "supervisor",
    Worker = "worker",
}

export interface WorkerDepartment {
    id:   string;
    name: string;
}