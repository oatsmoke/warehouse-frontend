import {Component, signal} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {MenuLeft} from '../../components/menu-left/menu-left';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';
import {MatMenuModule} from '@angular/material/menu';
import {MenuLeftData} from '../../services/menu-left';
import {ToolbarDepartment} from '../../components/toolbar-department/toolbar-department';
import {ToolbarContract} from '../../components/toolbar-contract/toolbar-contract';
import {ToolbarControl} from '../../components/toolbar-control/toolbar-control';
import {WebSocketService} from '../../services/web-socket';

@Component({
  selector: 'app-shell',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MenuLeft,
    RouterOutlet,
    MatMenuModule,
    ToolbarDepartment,
    ToolbarContract,
    ToolbarControl,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css'
})

export class Shell {
  toolBar!: string
  url!: string
  param!: string
  id!: string
  title = signal("")

  constructor(
    private router: Router,
    private webSocketService: WebSocketService
  ) {
    const menuLeft = MenuLeftData
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const primary = this.router.parseUrl(this.router.url).root.children["primary"]
      if (primary && primary.segments.length > 0) {
        const params = primary.segments.map(s => s.path)
        const title = menuLeft.find(item =>
          (item.link == "/" + params[0] && item.param == params[1]) ||
          (item.link == "/" + params[0] && !params[1])
        )
        if (title) {
          this.title.set(title.text)
        }
        this.toolBar = params[0]
        this.url = "/" + params[0]
        this.param = params[1] || ""
        this.id = params[2] || ""
        this.webSocketService.send(this.url + "/" + this.param + "/" + this.id)
      } else {
        this.router.navigate(['/equipment/department/0']).then()
      }
    })
  }
}
