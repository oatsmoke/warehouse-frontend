import {Component, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MenuControlData, MenuControlType} from '../../services/menu-control';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu-control',
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './menu-control.html',
  styleUrl: './menu-control.css'
})

export class MenuControl implements OnChanges {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string
  items: MenuControlType[]
  protected readonly control = signal("")

  constructor(private router: Router) {
    this.items = MenuControlData
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      if (this.id == "0") {
        this.control.set(this.items[0].title)
      } else {
        const item = this.items.find(item => item.id == this.id)
        if (item) {
          this.control.set(item.title)
        } else {
          this.router.navigate(["/control", this.param, this.items[0].id,]).then()
        }
      }
    }
  }
}
