import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticated = false;

  login() {
    // Perform login logic
    this.isAuthenticated = true;
  }

  logout() {
    // Perform logout logic
    this.isAuthenticated = false;
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}
