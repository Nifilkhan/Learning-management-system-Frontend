import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {



  showCard:boolean = false;
  showForm:boolean = false;

  toggelForm() {
    this.showForm = !this.showForm;
  }


}
