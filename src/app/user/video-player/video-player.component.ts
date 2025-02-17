import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";
import { Lecture, section } from '../shared/model/course';
import { log } from 'console';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  // encapsulation: ViewEncapsulation.None;
})
export class VideoPlayerComponent implements OnChanges,OnDestroy,AfterViewInit {

  @ViewChild('videoElement', { static: false })videoElement!:ElementRef;
  @Input() selectedLecture!:Lecture;
  @Input() lectureData:section [] = []

  public player!:Player;

  ngOnChanges(): void {
    console.log('its in ngonchangees ',this.selectedLecture)

    if(this.selectedLecture?.contentType==='article' && this.player) {

      this.player.dispose();
      this.player = null as any;
      return;
    }

    if(this.selectedLecture?.contentType === 'video' && this.selectedLecture.videoUrl) {
      if(this.player) {
        this.player.src({ type: 'video/mp4', src: this.selectedLecture.videoUrl });
          console.log('player is not initialised...');
          this.player.load();
      } else {
        setTimeout(() => {
          this.initVideoPlayer();
        }, 100);
      }
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - Checking if player should initialize', this.selectedLecture);
    if(this.selectedLecture && this.selectedLecture?.contentType === 'video'){
      this.initVideoPlayer();
    }
  }

  initVideoPlayer(): void {
    if(this.selectedLecture?.contentType === 'video') {
      this.player = videojs(this.videoElement.nativeElement, {
        controls: true,
        autoplay: false,
        responsive: true,
        fluid: false,
        controlBar: {
          pictureInPictureToggle: false, // Disables mini-player (PiP mode)
        },
        userActions: {
          doubleClick: false, // Prevents fullscreen toggle on double-click
        },
      });
      if(this.selectedLecture.contentType === 'video'){
        this.player.src({type:'video/mp4',src:this.selectedLecture.videoUrl})
      }
    }
  }


  ngOnDestroy(): void {
    if(this.player) {
      this.player.dispose();
    }
  }
}
