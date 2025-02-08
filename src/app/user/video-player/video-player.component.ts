import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";
import { section } from '../shared/model/course';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  // encapsulation: ViewEncapsulation.None;
})
export class VideoPlayerComponent implements OnChanges,OnDestroy,AfterViewInit {

  @ViewChild('videoElement', { static: false })videoElement!:ElementRef;
  @Input() videoUrl:string = '';
  @Input() lectureData:section [] = [];

  public player!:Player;

  ngOnChanges(): void {
    if(this.player && this.videoUrl) {
      this.player.src({type:'video/mp4',src:this.videoUrl})
    }
  }

  ngAfterViewInit(): void {
      this.player = videojs(this.videoElement.nativeElement, {
        controls: true,
        autoplay: true,
        responsive: true,
        fluid: false,
        controlBar: {
          pictureInPictureToggle: false, // Disables mini-player (PiP mode)
        },
        userActions: {
          doubleClick: false, // Prevents fullscreen toggle on double-click
        },
      })
  }


  ngOnDestroy(): void {
    if(this.player) {
      this.player.dispose();
    }
  }
}
