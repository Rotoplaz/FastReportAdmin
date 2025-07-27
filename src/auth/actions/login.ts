import { reportsApi } from "@/api/reports/reports-api"
import { LoginResponse } from "../interfaces/login.interface";

interface Data {
    code: string;
    password: string;
}

export const login = async (credentials: Data) => {

    try {
        
        const { data } = await reportsApi.post<LoginResponse>("/auth/login", credentials);
    
        return data
    } catch (error) {

        console.log(error)

        return null;
    }
}