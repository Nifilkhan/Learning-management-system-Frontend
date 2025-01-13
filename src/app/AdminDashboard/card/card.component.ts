import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  constructor(private userService:UsersService) {}

  showCard:boolean = false;
  showForm:boolean = false;
  totelUsers!:number;

  ngOnInit(): void {
    this.totalUsers();
  }

  toggelForm() {
    this.showForm = !this.showForm;
  }

  totalUsers():void {
    this.userService.getTotalCount().subscribe({
      next:(response) =>{
        console.log(response)
        this.totelUsers = response.totalCount;
      },
    })
  }

}
