import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;

  constructor(private auth:AuthService,private formBuilder: FormBuilder) {
    this. resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      // Handle login logic here (e.g., call authentication service)
      const email = this.resetForm.get('email')!.value;
    

      this.auth.setUserEmail(this.resetForm.get('email')!.value);
      //console.log('Login attempt with:', email, password);
    }
  }

  ngOnInit() {
  }


}
