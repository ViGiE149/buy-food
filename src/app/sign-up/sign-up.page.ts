import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: AuthService,private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      agreeTerms: [false, Validators.requiredTrue],  
    });
  }

  onSubmit() {
    if (this.registerForm.valid ) {
      // Handle registration logic here (e.g., call registration service)
      const username = this.registerForm.get('username')!.value;
      const email = this.registerForm.get('email')!.value;
      const password = this.registerForm.get('password')!.value;
      this.auth.signUp(username,email,password);
      console.log('Registration attempt with:', username, email, password);
    }
  }
  loginWithFacebook(){}
  loginWithGoogle(){}
  ngOnInit() {
  }

}
