import { resolve } from 'node:path';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit {

  isProcessing:boolean=true;
  isSuccess:boolean | null = true;

  constructor(private route:ActivatedRoute,private router:Router, private paymentService:PaymentService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
      console.log('verification session id',sessionId)
      if(sessionId) {
        this.paymentService.verifyPayment(sessionId).subscribe({
          next:(response) => {
            console.log('verification respnse....',response)
            console.log('type of verification response.....', typeof response.results?.success)
             this.isSuccess = response.results?.success === true;
            this.isProcessing = false
            setTimeout(() => {
              this.router.navigate(['/home/my-learning'])
            },4000);
          }, error:(err) => {
            console.log('verification error....', err);
            this.isSuccess = false;
            this.isProcessing = false;
          },
        })
      } else {
            this.isSuccess = false;
            this.isProcessing = false;
      }
    })
  }

  onCoursePage() {
    this.router.navigate(['/home/courses'])
  }
}
