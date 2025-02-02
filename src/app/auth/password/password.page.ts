import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertsService } from 'src/app/common/services/alerts.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderPage } from 'src/app/common/pages/loader/loader.page';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, LoaderPage]
})
export class PasswordPage implements OnInit {
  passwordForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertsService);
  private router = inject(Router);
  isPasswordVisible: boolean = false;
  private destroy$ = new Subject<void>();
  isLoading = false; 


  constructor() { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  onSubmit() {
    if (this.passwordForm.valid) {
      this.isLoading=true;
      const password = this.passwordForm.value.password;
      const userId = localStorage.getItem("userId")
      this.authService.setUserPassword(userId, password).pipe(takeUntil(this.destroy$)).subscribe({
        next:(resp)=>{
          console.log(resp);
          this.alertService.showSuccessToastmsg(resp.message);
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(["/profile"])
          }, 2000);
        },
        error:(err)=>{
          this.isLoading=false;
          this.alertService.showToastFailedMsg(err.error.messag);
        }
      })
    } else {
      console.log('Form is invalid.');
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next();
    this.destroy$.complete();
  }
}
