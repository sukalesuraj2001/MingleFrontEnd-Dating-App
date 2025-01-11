import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup; // Reactive form group
  isModalOpen = false;
  selectedDate: string = '';
  avatarUrl: any;
  private fb = inject(FormBuilder)

  constructor() {

  }

  ngOnInit() {
    this.initializeForm();
  }


  initializeForm() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result;
        this.profileForm.get('avatar')?.setValue(this.avatarUrl);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onDateChange(event: any) {
    this.selectedDate = new Date(event.detail.value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    this.profileForm.get('birthDate')?.setValue(this.selectedDate); 
    this.closeModal();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form Data:', this.profileForm.value); 
    } else {
      console.log('Form is invalid');
    }
  }

}
