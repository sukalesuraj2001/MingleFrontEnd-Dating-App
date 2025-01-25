import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MobileNumber, User } from '../interface/auth';
import { AlertsService } from 'src/app/common/services/alerts.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-number',
  templateUrl: './number.page.html',
  styleUrls: ['./number.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NumberPage implements OnInit {
  mobileForm!: FormGroup;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authservice = inject(AuthService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.initalizeMobileNumber();
  }
  // Initialize the form group with validation
  initalizeMobileNumber() {
    this.mobileForm = this.fb.group({
      countryCode: ['+91', Validators.required],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]]
    });
  }
  onSubmit() {
    if (this.mobileForm.valid) {
      const fullMobileNumber = this.mobileForm.value.mobileNumber;
      this.authservice.registerMobileNumber(fullMobileNumber).pipe(takeUntil(this.destroy$)).subscribe({
        next: (resp: MobileNumber) => {
          this.alertService.showSuccessToastmsg(resp.message);
          this.getUserByMobileNumber(fullMobileNumber);
          this.router.navigate(['/otp-verify']);
        },
        error: (err) => {
          this.alertService.showToastFailedMsg(err.error.message);
        }
      })
    } else {
      console.error('Form is invalid');
    }
  }
  getUserByMobileNumber(mobileNumber: number) {
    this.authservice.getUserByMobileNumber(mobileNumber).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resp: User) => {
        this.sendOtp(resp.user_id);
        localStorage.setItem("userId",resp.user_id);
      },
      error: (err) => {
        console.log("err", err);
      }
    })
  }

  sendOtp(user_id:string){
    this.authservice.sendOtp(user_id).pipe(takeUntil(this.destroy$)).subscribe({
      next:(resp)=>{
        localStorage.setItem("otp", resp.otp);
        this.alertService.showSuccessToastmsg(resp.message);
      },
      error:(err)=>{
        console.log(err)
        this.alertService.showToastFailedMsg(err.error.message);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
