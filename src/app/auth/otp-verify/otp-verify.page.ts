import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.page.html',
  styleUrls: ['./otp-verify.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class OtpVerifyPage implements OnInit, OnDestroy {
  timer: string = '01:00';
  seconds: number = 60;
  timerInterval: any;
  otpForm!: FormGroup;
  private fb = inject(FormBuilder);
  private navController = inject(NavController);

  constructor() {}

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
  intializeForm(){
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
      const otpValue = this.otpControls.value.join('');
      console.log('Entered OTP:', otpValue);
      // Add your verification logic here
    }
  }
  
    ngOnDestroy() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
    }
}
