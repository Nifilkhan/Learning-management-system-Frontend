import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  standalone:true,
  imports:[NgxSkeletonLoaderModule,CommonModule],
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {

  @Input() type:'list' | 'video' = 'list';
}
