export interface LoginResponse {
    user: User;
    jwt:  string;
}

export interface User {
    id:                   string;
    firstName:            string;
    lastName:             string;
    email:                string;
    code:                 string;
    role:                 string;
    createdAt:            Date;
    updatedAt:            Date;
    workerDepartmentId:   null;
    supervisesDepartment: SupervisesDepartment;
}

export interface SupervisesDepartment {
    id:           string;
    name:         string;
    description:  string;
    supervisorId: string;
    createdAt:    Date;
    updatedAt:    Date;
}
