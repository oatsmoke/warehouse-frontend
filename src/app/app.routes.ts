import {Routes} from '@angular/router';
import {Equipment} from './pages/equipment/equipment';
import {Search} from './pages/search/search';
import {Control} from './pages/control/control';
import {Settings} from './pages/settings/settings';

export const routes: Routes = [
  {path: "equipment/:param/:id", component: Equipment},
  {path: "search", component: Search},
  {path: "control/:param/:id", component: Control},
  {path: "settings", component: Settings},
];
