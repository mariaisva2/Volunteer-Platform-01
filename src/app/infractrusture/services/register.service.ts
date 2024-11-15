import { IRegisterResponse } from "@/app/core/application/dto/auth/register-response.dto";
import { HttpClient } from "../utils/client";



export class RegisterService {
    private clientHttp: HttpClient;

    constructor() {
        this.clientHttp = new HttpClient();
    }

    async register(req: FormData): Promise<IRegisterResponse>{
        const formData = true;
        return await this.clientHttp.post<IRegisterResponse, FormData>(
            "users",
            req,
            formData
        )
    }
}
  