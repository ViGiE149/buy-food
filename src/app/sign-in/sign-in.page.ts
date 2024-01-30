import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loginForm: FormGroup;

  constructor(private auth:AuthService,private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic here (e.g., call authentication service)
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      this.auth.login(email,password);
      console.log('Login attempt with:', email, password);
    }
  }

  ngOnInit() {
  }

}
