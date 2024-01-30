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
  private isAuthenticated = true;

  constructor(
    public navCtrl: NavController,
    private auth: AngularFireAuth,
    private loadingController: LoadingController
  ) {}

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
      this.isAuthenticated = true;
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

  logout() {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}
