import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-dialoge',
  templateUrl: './cart-dialoge.component.html',
  styleUrl: './cart-dialoge.component.scss'
})
export class CartDialogeComponent  {

  constructor(public dialogeRef:MatDialogRef<CartDialogeComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}


  closeDialoge() {
    this.dialogeRef.close();
  }

  goToCart() {
    this.dialogeRef.close();
    this.router.navigate(['/home/cart'])
  }
}
