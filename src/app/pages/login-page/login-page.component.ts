import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgInputComponent } from '../../data';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, AgInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(val => {
      console.log(val)
    })
  }

  onSubmit() {
    if (this.form.value) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate(['']);
        console.log(res);
      });
    }
  }
}
