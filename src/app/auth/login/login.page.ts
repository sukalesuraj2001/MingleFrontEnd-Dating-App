import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoaderPage } from 'src/app/common/pages/loader/loader.page';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertsService } from 'src/app/common/services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LoaderPage, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  isPasswordVisible: boolean = false;
  private fb = inject(FormBuilder);
  private destroy$= new Subject<void>();
  private authService=inject(AuthService);
  private alertService=inject(AlertsService);
  private router=inject(Router);;
  constructor() { }

  ngOnInit() {
    this.initializeLoginForm();
  }

  // Initialize Reactive Form with Validations
  initializeLoginForm() {
    this.loginForm = this.fb.group({
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
      ]]
    });
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  // Handle Form Submission
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData=this.loginForm.value;
      this.authService.login(loginData).pipe(takeUntil(this.destroy$)).subscribe({
        next:(resp)=>{
          this.alertService.showSuccessToastmsg(resp.message);
          localStorage.setItem("Token",resp.token);
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/dashboard'])
          }, 3000);
        }, error:(err)=>{
          this.isLoading=false;
          this.alertService.showToastFailedMsg(err.error.message)
        }
      })
    } else {
      console.error('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
