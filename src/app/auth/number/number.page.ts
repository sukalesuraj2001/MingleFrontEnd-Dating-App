import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-number',
  templateUrl: './number.page.html',
  styleUrls: ['./number.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NumberPage implements OnInit, OnDestroy {
  mobileForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeMobileNumber();
  }

  // Initialize the form group with validation
  initializeMobileNumber() {
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
    } else {
      console.log('Form is invalid');
    }
  }

  // Cleanup when component is destroyed (if needed in future)
  ngOnDestroy() {
    // You can perform any cleanup here if needed, e.g., unsubscribing from observables
    console.log('Component destroyed');
  }
}
