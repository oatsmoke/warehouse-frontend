import {Component, Input, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MenuOption, MenuOptionType} from '../menu-option/menu-option';
import {TableCellPipe} from '../../table-cell-pipe';

export interface TableColumnsType {
  column_def: string
  header: string
  cell: (cell: any) => string
}

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MenuOption,
    TableCellPipe
  ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})

export class Table implements OnInit {
  @Input() columns: TableColumnsType[] = []
  @Input() items: any[] = []
  @Input() options: MenuOptionType[] = []
  @Input() pickOn: boolean = false
  displayedColumns: string[] = []
  pickItems: number[] = []

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.column_def).concat("options")
  }

  pick(id: number) {
    if (this.pickOn) {
      this.pickItems = this.pickItems.includes(id) ? this.pickItems.filter(n => n !== id) : [...this.pickItems, id]
      console.log(this.pickItems)
    }
  }
}
