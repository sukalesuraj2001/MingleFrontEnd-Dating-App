import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


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
    // Concatenate the country code with the mobile number
    if (this.mobileForm.valid) {
      const fullMobileNumber = this.mobileForm.value.countryCode + this.mobileForm.value.mobileNumber;
      console.log('Mobile Number with Country Code:', fullMobileNumber);
      this.router.navigate(['/otp-verify'])
    } else {
      console.log('Form is invalid');
    }
  }

}
