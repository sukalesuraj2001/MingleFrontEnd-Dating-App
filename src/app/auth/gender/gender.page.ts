import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GenderPage implements OnInit {
  private navController = inject(NavController);

   selectedGender: string = '';

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log('Selected Gender:', this.selectedGender); 
  }
  goBack() {
    this.navController.back();
  }
}
