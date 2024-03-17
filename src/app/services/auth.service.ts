import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

enum AuthError {
  MISSING_EMAIL = 'auth/missing-email',
  INVALID_EMAIL = 'auth/invalid-email',
  USER_NOT_FOUND = 'auth/user-not-found',
  WEAK_PASSWORD = 'auth/weak-password',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  userEmail: any;
  private authenticationTime: any;
  private readonly expirationTimeInMinutes = 60; // Adjust as needed

  constructor(
    public navCtrl: NavController,
    private auth: AngularFireAuth,
    private loadingController: LoadingController
  ) {
    this.checkAuthentication();
  }

  private async presentLoader(typeOfFuction:any) {
    const loader = await this.loadingController.create({
      message: typeOfFuction,
      cssClass: 'custom-loader-class',
    });
    await loader.present();
    return loader;
  }

  private async handleAuthError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    let alertMessage: string;

    switch (errorCode) {
      case AuthError.MISSING_EMAIL:
        alertMessage = 'Missing email';
        break;
      case AuthError.INVALID_EMAIL:
        alertMessage = 'Invalid email format';
        break;
      case AuthError.USER_NOT_FOUND:
        alertMessage = 'Invalid email';
        break;
      case AuthError.WEAK_PASSWORD:
        alertMessage = 'Password should be at least 6 characters';
        break;
      case AuthError.EMAIL_ALREADY_IN_USE:
        alertMessage = 'Invalid email or password';
        break;
      default:
        alertMessage = errorMessage;
    }
    if (alertMessage) {
      alert(alertMessage);
    }
  }

  async login(email: any, password: string) {
    const loader = await this.presentLoader("Signing in");
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      loader.dismiss();
      this.setUserEmail(email);
      this.isAuthenticated = true;


      localStorage.setItem('isAuthenticated', 'true');
      this.authenticationTime = Date.now();
      localStorage.setItem('authenticationTime',  this.authenticationTime.toString());
     

      this.navCtrl.navigateForward('/home');
    } catch (error) {
      loader.dismiss();
      this.handleAuthError(error);
    }
  }

  async signUp(username: string, email: string, password: string) {
    const loader = await this.presentLoader("Signing Up");
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      loader.dismiss();
      this.navCtrl.navigateForward('/sign-in');
    } catch (error) {
      loader.dismiss();
      this.handleAuthError(error);
    }
  }

 
  isAuthenticatedUser() {
    if (this.isAuthenticated && this.authenticationTime) {
      const currentTime = Date.now();
      const elapsedTimeInMinutes = (currentTime - this.authenticationTime) / (1000 * 60);
      // Check if elapsed time exceeds expiration time
      if (elapsedTimeInMinutes > this.expirationTimeInMinutes) {
        // If expired, log out the user
        this.logout();
        return false;
      }
    }
    return this.isAuthenticated;
  }


  private checkAuthentication() {
    // Check if authentication state and authentication time are stored in local storage
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedAuthenticationTime = localStorage.getItem('authenticationTime');
    if (isAuthenticated && storedAuthenticationTime) {
      this.isAuthenticated = true;
      this.authenticationTime = parseInt(storedAuthenticationTime, 10);
    }
   // console.log(this.authenticationTime)
  }


  logout() {
    this.isAuthenticated = false;
    this.authenticationTime = null;
    // Remove authentication state and authentication time from local storage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authenticationTime');
  }
  setUserEmail(email: string): void {
    this.userEmail = email;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }
}
