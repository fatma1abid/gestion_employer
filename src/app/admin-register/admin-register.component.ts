import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  // Importer votre service d'authentification
import { Router } from '@angular/router';
import { AdminModel } from '../adminModel';  // Importer AdminModel

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  adminName: string = '';
  adminPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode de soumission du formulaire
  onSubmit() {
    // Vérifier que l'email contient @gmail.com
    if (!this.adminName.includes('@gmail.com')) {
      this.errorMessage = 'The email must contain @gmail.com';
      return;
    }

    // Créer une instance de AdminModel avec les données du formulaire
    const admin = new AdminModel();
    admin.adminName = this.adminName;
    admin.adminPassword = this.adminPassword;

    // Appeler la méthode d'enregistrement dans le service AuthService
    this.authService.register(admin).subscribe(
      (response) => {
        console.log('Admin registered:', response);  // Afficher la réponse dans la console
        this.router.navigate(['/login']);  // Rediriger vers la page de login
      },
      (error) => {
        console.error('Error registering admin:', error);
        // Afficher les erreurs renvoyées par l'API
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    );
  }

  // Méthode de redirection vers la page de connexion
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
