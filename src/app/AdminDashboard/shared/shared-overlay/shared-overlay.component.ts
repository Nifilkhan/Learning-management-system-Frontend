import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-overlay',
  templateUrl: './shared-overlay.component.html',
  styleUrl: './shared-overlay.component.scss'
})
export class SharedOverlayComponent {
@Input() showOverlay!:false;
}
