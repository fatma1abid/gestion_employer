import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdminModel } from '../adminModel';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  // Initialisation du formulaire avec validation
  loginForm = this.fb.group({
    adminName: ['', [Validators.required, Validators.email]],  // Email validation
    adminPassword: ['', [Validators.required]],  // Mot de passe requis
  });

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder  // Injection de FormBuilder pour la création du formulaire réactif
  ) {}

  // Méthode d'envoi du formulaire
  successMessage: string = '';

  onSubmit() {
    const adminName = this.loginForm.get('adminName')?.value ?? '';
    const adminPassword = this.loginForm.get('adminPassword')?.value ?? '';

    // Vérification de l'email (adminName)
    if (adminName && !adminName.includes('@gmail.com')) {
      this.errorMessage = 'L\'email doit être un @gmail.com';
      return;
    }

    const admin = new AdminModel();
    admin.adminName = adminName;
    admin.adminPassword = adminPassword;

    this.authService.login(admin).subscribe(
      (response) => {
        // Loguez toute la réponse pour comprendre sa structure
        console.log('Login successful:', response);

        // Si l'email est présent dans la réponse, affichez-le
        if (response && response.adminName) {
          console.log('Email de l\'utilisateur connecté:', response.adminName); // Affiche l'email si disponible
        } else {
          console.log('Email non trouvé dans la réponse');
        }

        // Enregistrer l'utilisateur dans le localStorage
        this.authService.setCurrentUser(response);
        this.router.navigate(['/show-all-employees']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
      }
    );
  }



  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
