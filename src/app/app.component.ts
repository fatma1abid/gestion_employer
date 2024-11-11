import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedInEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur actuel depuis le localStorage
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.adminName) {
      this.loggedInEmail = currentUser.adminName; // L'email de l'utilisateur connecté
    }
  }

  logout() {
    this.authService.logout();
    this.loggedInEmail = null; // Réinitialiser l'email après la déconnexion
  }
}
