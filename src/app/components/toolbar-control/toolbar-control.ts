import {Component, Input} from '@angular/core';
import {MenuControl} from '../menu-control/menu-control';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ContentStateService, State} from '../../services/content-state';

@Component({
  selector: 'app-toolbar-control',
  imports: [
    MenuControl,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './toolbar-control.html',
  styleUrl: './toolbar-control.css'
})

export class ToolbarControl {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string

  constructor(private contentStateService: ContentStateService) {
  }

  create() {
    this.contentStateService.toggleContent(State.Create)
  }
}
