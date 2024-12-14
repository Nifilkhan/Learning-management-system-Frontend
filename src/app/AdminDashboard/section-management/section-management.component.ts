import { Component } from '@angular/core';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent {

  state = ['Draft','Publish']
}
