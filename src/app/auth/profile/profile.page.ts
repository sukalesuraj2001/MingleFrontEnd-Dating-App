import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from 'src/app/common/services/alerts.service';
import { LoaderPage } from 'src/app/common/pages/loader/loader.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, LoaderPage]
})
export class ProfilePage implements OnInit, OnDestroy {
  profileForm!: FormGroup; // Reactive form group
  isModalOpen = false;
  selectedDate: string = '';
  avatarUrl: any;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();
  isLoading = false; 
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
      const file = input.files[0];
      this.profileForm.get('avatar')?.setValue(file.name);
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
      this.isLoading=true;
      const userId = localStorage.getItem("userId");
      const formdata = this.profileForm.value;
      this.authService.updateProfile(userId, formdata).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.alertService.showSuccessToastmsg(res.message);
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/gender'])
          }, 2000);
  
        },
        error: (err) => {
          this.isLoading=false;
          this.alertService.showToastFailedMsg(err.error.message);
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
