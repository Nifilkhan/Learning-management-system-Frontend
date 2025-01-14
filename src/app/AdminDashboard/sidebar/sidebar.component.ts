import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/shared/service/auth.service.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

constructor(private authService:AuthService,private router:Router){}


  logout() {
    this.authService.logogut().subscribe({
      next:(response) => {
          console.log('logged out succesfully',response);
        this.router.navigate(['/signin'])
      },error:(err) =>{
        console.log('error occured while logout',err)
      },
    })
  }
}
