import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.scss'
})
export class AddCartComponent implements OnInit {

  userId:string | null = null;
  cartItems:any;
  imageUrl:string [] = [];
  totalAmount:number = 0;

  constructor(private cartService:CartService){}


  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCart().subscribe({
      next:(response) => {
        console.log('response from the get cart api',response)
        this.cartItems = response.cart.items;
        this.imageUrl = this.cartItems.map((course: { thumbnail: string; }) => `${environment.AWS_S3_URL}${course.thumbnail}` );
        this.calculateTotal();
      },
    })
  }

  removeFromCart(courseId:string) {
    this.cartService.removeCart(courseId).subscribe({
      next:(response) => {
        console.log('cart item deleted succesfully',response);
        this.cartItems = this.cartItems.filter((cart: { _id: string; }) => cart._id !== courseId);
      this.calculateTotal();
      },
    })
  }

  calculateTotal() {
  this.totalAmount = this.cartItems.reduce((acc: any,item: { price: any; }) => acc + item.price,0)
  }
  checkout() {

  }

}
