import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class GenderPage implements OnInit {
  private navController = inject(NavController);
  private router = inject(Router);

   selectedGender: string = '';

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log('Selected Gender:', this.selectedGender); 
this.router.navigate(['/interest'])
  }
  goBack() {
    this.navController.back();
  }
}
