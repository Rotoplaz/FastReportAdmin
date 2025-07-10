export interface MetricsResponse {
    totalReports: number;
    reportsInProgress: number;
    reportsPending: number;
    reportsCompleted: number;
    reportsPriorityHigh: number;
}

export interface GetReportsRequest {
    limit:         number;
    page:          number;
    numberOfPages: number;
    count:         number;
    data:          Report[];
}

export interface Report {
    id:          string;
    categoryId:  string;
    studentId:   string;
    title:       string;
    description: string;
    priority:    Priority;
    status:      Status;
    location:    string;
    createdAt:   Date;
    updatedAt:   Date;
    student:     Student;
    category:    Category;
    photos:      Photo[];
}

export interface Category {
    id:          string;
    name:        string;
    description: string;
}

export interface Photo {
    url: string;
    id:  string;
}

export enum Priority {
    High = "high",
    Low = "low",
    Medium = "medium",
}

export enum Status {
    Completed = "completed",
    InProgress = "in_progress",
    Pending = "pending",
}

export interface Student {
    id:        string;
    firstName: string;
    lastName:  string;
    email:     string;
    role:      Role;
}

export enum Role {
    Student = "student",
}
