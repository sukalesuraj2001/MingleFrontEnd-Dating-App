import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from 'src/app/common/pages/tabs/tabs.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabsPage]
})
export class DashboardPage implements OnInit {
  private startX: number = 0;
  private endX: number = 0;
  users = [
    { id: 1, foto: "https://i.pinimg.com/736x/14/dc/e0/14dce015e788ae05a7d74c76a149fb84.jpg", name: "John Doe", age: 25, distance: "5km" },
    { id: 2, foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbV284Sts0Fpjx9nQrUbOtgFql57SwPFw1KUBkypyX_34qiyAJFG42X0C3MqTDjWCAf8A&usqp=CAU", name: "Alice Smith", age: 30, distance: "10km" },
    { id: 3, foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2VcsdlrpKOMZ344NyegtPBvJaqkGd9kj1w&s", name: "Bob Johnson", age: 22, distance: "2km" },
    { id: 4, foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXB3hSXTv25F1KPZda0tQImYuMUDjqsGuADRiwEazMZKdNQR86ezH_0J1lJyBGi3_bpMY&usqp=CAU", name: "Emma Brown", age: 27, distance: "8km" },
    { id: 5, foto: "https://i.pinimg.com/736x/14/dc/e0/14dce015e788ae05a7d74c76a149fb84.jpg", name: "Charlie Davis", age: 35, distance: "15km" }
  ];

  ngOnInit(): void {
  }
  touchStart(evt: any) {
    this.startX = evt.touches[0].pageX;
  }
  touchMove(evt: any, index: number) {
    let deltaX = this.startX - evt.touches[0].pageX;
    let deg = deltaX / 10;
    this.endX = evt.touches[0].pageX;
    // Get card element
    const card = document.getElementById("card-" + index);
    if (card) {
      card.style.transform = `translateX(${-deltaX}px) rotate(${-deg}deg)`;
    }
    // add icons as per reject or like  
    if ((this.endX - this.startX) < 0) {
      (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity = String(deltaX / 100)

    } else {
      (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity = String(-deltaX / 100)
    }

  }

  touchEnd(index: number) {
    if (this.endX > 0) {
      let finalX = this.endX - this.startX;
      const card = document.getElementById("card-" + index);
      if (!card) return;
      if (finalX >= 100) {
        card.style.transition = "1s";
        card.style.transform = "translateX(1000px) rotate(30deg)";

        setTimeout(() => {
          this.users.splice(index, 1); // Remove user from array
        }, 300);
      } else if (finalX <= -100) {
        card.style.transition = "1s";
        card.style.transform = "translateX(-1000px) rotate(-30deg)";

        setTimeout(() => {
          this.users.splice(index, 1); // Remove user from array
        }, 300);
      } else {
        card.style.transition = ".3s";
        card.style.transform = "translateX(0px) rotate(0deg)";

        setTimeout(() => {
          card.style.transition = "0s";
        }, 350);
      }
      this.startX = 0;
      this.endX = 0;
      (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity = "0";
      (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity = "0";

    }
  }

}
