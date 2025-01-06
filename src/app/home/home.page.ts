import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swiper from 'swiper';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage {
  swiper!: Swiper;
  activeSlideIndex: number = 1;
  slideText: any = {
    heading: 'Algorithm',
    text: `Users going through a vetting process to ensure you never match with bots.`,
  };

  slideItems: { image: string; text: string }[] = [
    { image: 'assets/images/girl.png', text: 'Slide 1 description' },
    { image: 'assets/images/girl2.png', text: 'Slide 2 description' },
    { image: 'assets/images/girl3.png', text: 'Slide 3 description' },
  ];

  slideDescriptions = [
    { heading: 'Matches', text: 'We match you with people that have a large array of similar interests.' },
    { heading: 'Algorithm', text: 'Users going through a vetting process to ensure you never match with bots.' },
    { heading: 'Premium', text: 'Sign up today and enjoy the first month of premium benefits on us.' },
  ];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer) {
      this.swiper = new Swiper(swiperContainer as HTMLElement, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 1,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
      });

      // Update slide text and paginator on slide change
      this.swiper.on('slideChange', () => {
        this.updateSlideText(this.swiper.realIndex);
        this.updateActiveDot(this.swiper.realIndex);
      });

      // Initialize slide text for the initial slide
      this.updateSlideText(this.swiper.realIndex);
    } else {
      console.error('Swiper container not found!');
    }
  }

  // Update slide text
  updateSlideText(activeIndex: number): void {
    this.slideText = this.slideDescriptions[activeIndex] || 'Slide 1 description';
  }

  // Update active dot
  updateActiveDot(activeIndex: number): void {
    this.activeSlideIndex = activeIndex;
  }
}
