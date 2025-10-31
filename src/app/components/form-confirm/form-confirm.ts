import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ContentStateService, StateDefault} from '../../services/content-state';

@Component({
  selector: 'app-form-confirm',
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './form-confirm.html',
  styleUrl: './form-confirm.css'
})
export class FormConfirm {
  @Input() id!: number;
  @Output() confirm = new EventEmitter<number>();

  constructor(private contentStateService: ContentStateService) {
  }

  ok(id: number) {
    this.confirm.emit(id)
    this.cancel()
  }

  cancel() {
    this.contentStateService.toggleContent(StateDefault)
  }
}
