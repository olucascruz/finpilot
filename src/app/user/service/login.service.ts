import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user: string;
  };
}


export interface TokenResponse {
  access_token:string;
  token_type:string;
}


@Injectable({
  providedIn: 'root'
})


export class LoginService {
  // URL do endpoint para onde os dados serão enviados
  private apiUrl = 'http://127.0.0.1:8000/';  // Substitua com o URL real

  tryGetTokenAccess(){
    const token = localStorage.getItem("accessToken");
    if(!token){
      console.warn("Token não encontrado. Redirecionando para login...");
      window.location.href = "/";
      return null;
    }
    return token
  }

  getHeaders(): HttpHeaders {
    const token = this.tryGetTokenAccess()
    if(token==null){
      throw new Error("Token de acesso não encontrado. Faça login novamente.");
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });
  }
  constructor(private http: HttpClient) {}

  register(data: FormData): Observable<RegisterResponse> {
    const url = this.apiUrl+'users/register'
    return this.http.post<RegisterResponse>(url, data);
  }

  login(data: FormData): Observable<TokenResponse> {
    const url = this.apiUrl+'auth/login'
    return this.http.post<TokenResponse>(url, data);
  }
}