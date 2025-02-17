import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../../shared/model/user-data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  @Input() userData!:UserData;

  initials:string = '';
  backGroundColor:string = '';
  profileImage:string | undefined = '';

ngOnInit(): void {
  if(this.userData) {
    this.initials = this.getInitials(this.userData.firstName,this.userData.lastName);
    this.backGroundColor = this.getColor(this.userData.firstName);
    this.profileImage = this.userData.profileImage;
  }

}

  getInitials(firstName:string,lastName:string):string{
    const firstInitial = firstName ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName ? lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
  }

  getColor(name:string):string {
    return this.getRandomColor(name);
  }
  getRandomColor(name:string):string{
    const charCode = name.charCodeAt(0);

    // Simple modulo operation to pick a color from a predefined set
    const colors = ['#414d0b', '#480048', '#49a09d', '#283048', '#232526', '#134E5E'];
    const index = charCode % colors.length;
    return colors[index];
  }
}
