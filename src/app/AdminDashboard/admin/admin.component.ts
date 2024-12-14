import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  constructor(private route:Router) {}
  showCard:boolean = false;
  isVisible = false;

  showForm() {
    this.isVisible = !this.isVisible
  }

  ngOnInit(): void {
    this.route.events.subscribe(() => {
      this.showCard = this.route.url === '/admin-dashboard/overview'
    })
  }
}
