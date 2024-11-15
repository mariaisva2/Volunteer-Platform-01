
import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { HttpClient } from "../utils/client-http";
import { ILoginResponse } from "@/app/core/application/dto/auth/login-response.dto";
import { PAuth } from "@/app/core/application/ports/auth.port";

export class AuthService implements PAuth {
    private clientHttp: HttpClient
    private basePath: string = "auth";

    constructor(){
        this.clientHttp = new HttpClient();
    }
    async login(req: ILoginRequest): Promise<ILoginResponse> {
        return this.clientHttp.post<ILoginResponse, ILoginRequest> (
            `${this.basePath}/login`,
            req
        )
    }
}