import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from 'src/app/common/services/alerts.service';
import { LoaderPage } from 'src/app/common/pages/loader/loader.page';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.page.html',
  styleUrls: ['./otp-verify.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, LoaderPage]
})
export class OtpVerifyPage implements OnInit, OnDestroy {
  timer: string = '01:00';
  seconds: number = 60;
  timerInterval: any;
  otpForm!: FormGroup;
  private fb = inject(FormBuilder);
  private navController = inject(NavController);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();
  isLoading = false; 

  constructor() { }

  ngOnInit() {
    this.startTimer();
    this.intializeForm();
  }

  goBack() {
    this.navController.back();
  }

  // Start the countdown timer
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.seconds--;
      const minutes = Math.floor(this.seconds / 60);
      const remainingSeconds = this.seconds % 60;

      // Format time to mm:ss
      this.timer = `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;

      // Stop the timer when it reaches 0
      if (this.seconds <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000); // Update every second
  }

  // Padding function to ensure two digits
  padZero(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  // intialize the otp  form 
  intializeForm() {
    this.otpForm = this.fb.group({
      otp: this.fb.array(
        new Array(4)
          .fill('')
          .map(() =>
            this.fb.control('', [
              Validators.required,
              Validators.pattern('[0-9]'),
            ])
          )
      ),
    });
  }
  get otpControls(): FormArray {
    return this.otpForm.get('otp') as FormArray;
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 3) {
      const nextInput = (event.target as HTMLElement)
        .nextElementSibling as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onBackspace(event: Event, index: number): void {
    const keyboardEvent = event as KeyboardEvent; // Explicitly cast the event
    if (keyboardEvent.key === 'Backspace' && index > 0) {
      const prevInput = (event.target as HTMLElement)
        .previousElementSibling as HTMLInputElement;
      if (prevInput && !(event.target as HTMLInputElement).value)
        prevInput.focus();
    }
  }

  verifyOtp(): void {
    if (this.otpForm.valid) {
      this.isLoading = true; // Show loader

      const otpValue = this.otpControls.value.join('');
      const userId = localStorage?.getItem("userId")
      this.authService.verifyOtp(userId, otpValue).pipe(takeUntil(this.destroy$)).subscribe({
        next: (resp) => {
          this.alertService.showSuccessToastmsg(resp.message);
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/password']);
          }, 2000);
          },
        error: (err) => {
          this.isLoading=false;
          this.alertService.showToastFailedMsg(err.error.message);
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
