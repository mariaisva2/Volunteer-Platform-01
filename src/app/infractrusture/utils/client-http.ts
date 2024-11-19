import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

const defaultBaseUrl = "https://communnityvolunteering-production.up.railway.app/api/v1"

export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || defaultBaseUrl;
    }

    private async getHeader() {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Obtiene la sesión actual para verificar si está autenticado
        const session = await getServerSession(authOptions) as CustomSession;
        if (session && session.user.token) {
            headers["Authorization"] = `Bearer ${session.user.token}`;
        }

        return headers;
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return await response.json();
    }

    async get<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "GET",
            cache: "no-store"
        })
        return this.handleResponse(response)
    }

    async delete<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "DELETE",
        })
        return this.handleResponse(response)
    }

    async post<T, B>(url: string, formData: boolean, body: B): Promise<T> {
        const headers = await this.getHeader();
        let response: Response;
    
        if (formData) {
            // Si formData es true, enviamos la solicitud como 'FormData'
            let formBody = new FormData();
    
            // Asegúrate de que body es un objeto o una instancia de FormData.
            // Si body es un objeto regular, agrega sus propiedades a FormData.
            if (body && typeof body === "object" && !(body instanceof FormData)) {
                // Iteramos sobre las propiedades de body y agregamos los valores al FormData
                Object.keys(body).forEach(key => {
                    // Agregamos las propiedades de body al FormData
                    formBody.append(key, (body as any)[key]);
                });
            } else if (body instanceof FormData) {
                // Si body ya es un FormData, usamos directamente.
                formBody = body;
            }
    
            response = await fetch(`${this.baseUrl}/${url}`, {
                headers: headers, // No es necesario especificar Content-Type con FormData
                method: "POST",
                body: formBody, // Usamos formBody que es una instancia de FormData
            });
        } else {
            // Si formData es false, enviamos el cuerpo como JSON
            response = await fetch(`${this.baseUrl}/${url}`, {
                headers: {
                    ...headers,
                    "Content-Type": "application/json", // Asegúrate de establecer el Content-Type adecuado
                },
                method: "POST",
                body: JSON.stringify(body),
            });
        }
    
        return this.handleResponse(response);
    }
    

    async put<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(body),
        })
        return this.handleResponse(response);
    }
}