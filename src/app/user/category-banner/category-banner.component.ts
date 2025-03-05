import { Component } from '@angular/core';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrl: './category-banner.component.scss'
})
export class CategoryBannerComponent {
  openFAQ: number | null = null;

  toggleFAQ(index: number) {
    this.openFAQ = this.openFAQ === index ? null : index;
  }

}
