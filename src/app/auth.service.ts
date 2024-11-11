import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminModel } from './adminModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/api/v1/login';
  private registerUrl = 'http://localhost:8081/api/v1/register';

  constructor(private http: HttpClient) {}

  login(admin: AdminModel): Observable<any> {
    return this.http.post<any>(this.loginUrl, admin);
  }

  register(admin: AdminModel): Observable<any> {
    return this.http.post<any>(this.registerUrl, admin);
  }

  // Enregistrer l'utilisateur dans le localStorage
  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user)); // Stocke l'utilisateur dans le localStorage
  }

  // Récupérer l'utilisateur actuel depuis le localStorage
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}'); // Récupère l'utilisateur depuis le localStorage
  }

  // Supprimer l'utilisateur du localStorage
  logout(): void {
    localStorage.removeItem('currentUser'); // Supprime l'utilisateur du localStorage
  }



}
