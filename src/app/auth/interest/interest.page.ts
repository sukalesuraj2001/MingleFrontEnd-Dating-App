import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,NavController } from '@ionic/angular';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.page.html',
  styleUrls: ['./interest.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InterestPage implements OnInit {
  private navController = inject(NavController);

  constructor() { }

  ngOnInit() {
  }


  interests: string[] = [
    'Music', 'Travel', 'Sports', 'Reading', 'Cooking',
    'Movies', 'Fitness', 'Gaming', 'Photography', 'Art',
    'Dance', 'Writing', 'Technology', 'Nature', 
  ];
  
  selectedInterests: number[] = []; // Store indices of selected interests

  toggleInterest(index: number) {
    if (this.selectedInterests.includes(index)) {
      this.selectedInterests = this.selectedInterests.filter(i => i !== index);
    } else {
      this.selectedInterests.push(index);
    }
  }

  logSelectedInterests() {
    const selectedInterestNames = this.selectedInterests.map(index => this.interests[index]);
    console.log('Selected Interests:', selectedInterestNames);
  }

  goBack() {
    this.navController.back();
  }
}
