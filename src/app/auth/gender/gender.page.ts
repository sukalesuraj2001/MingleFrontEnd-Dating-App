import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertsService } from 'src/app/common/services/alerts.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class GenderPage implements OnInit, OnDestroy {
  private navController = inject(NavController);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();
  selectedGender: string = '';

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    const userId=localStorage.getItem("userId")
    this.authService.updateGender(userId,this.selectedGender).pipe(takeUntil(this.destroy$)).subscribe({
      next:(resp)=>{
        this.alertService.showSuccessToastmsg(resp.message);
        this.router.navigate(['/interest'])
      },
      error:(err)=>{
        this.alertService.showToastFailedMsg(err.error.message);
      }
    })
  }
  goBack() {
    this.navController.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
