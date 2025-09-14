export interface WorkersResponse {
    limit:         number;
    page:          number;
    numberOfPages: number;
    count:         number;
    data:          Worker[];
}

export interface Worker {
    id:                   string;
    firstName:            string;
    lastName:             string;
    email:                string;
    code:                 string;
    role:                 Role;
    createdAt:            Date;
    updatedAt:            Date;
    workerDepartment:     WorkerDepartment | null;
    supervisesDepartment: SupervisesDepartment | null;
}

export enum Role {
    Supervisor = "supervisor",
    Worker = "worker",
}

export interface SupervisesDepartment {
    id:           string;
    name:         string;
    description:  string;
    supervisorId: string;
    createdAt:    Date;
    updatedAt:    Date;
}

export interface WorkerDepartment {
    id:   string;
    name: string;
}
