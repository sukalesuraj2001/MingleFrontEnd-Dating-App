import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-number',
  templateUrl: './number.page.html',
  styleUrls: ['./number.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NumberPage implements OnInit {
  mobileForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    } else {
      console.log('Form is invalid');
    }
  }

}
