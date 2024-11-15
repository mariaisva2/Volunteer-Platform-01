
import { IResponseUser } from "@/app/core/application/dto/usersprojects/users-response.dto";
import { HttpClient } from "../utils/client-http";
import { IPostProject } from "@/app/core/application/dto/servicesprojects/projects-request.dto";


export class UserService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(): Promise<IResponseUser> {
        try {
            const response = await this.httpClient.get<IResponseUser>(`users`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async create(service: IPostProject) {
        try {
            console.log("Creating project with data:", service); 

            const response = await fetch(`/api/projects/create/projects`, {
                method: 'POST',
                body: JSON.stringify(service),
            });
            if (!response.ok) {
                const error = await response.json();
                console.error("Error response:", error); 
                throw new Error(error.error);
            }

            const data = await response.json();
            console.log("Response data:", data); 

            return data;
        } catch (error) {
            console.error("Error creating project:", error); 
            throw error;
        }
    }
}