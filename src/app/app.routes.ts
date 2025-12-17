import {Routes} from '@angular/router';
import {authGuard} from './auth-guard';

export const routes: Routes = [
  {
    path: "auth",
    loadComponent: () => import("./pages/auth/auth").then(m => m.Auth)
  },
  {
    path: "", loadComponent: () => import("./pages/shell/shell").then(m => m.Shell),

    children: [
      {
        path: "equipment/:param/:id",
        loadComponent: () => import("./pages/equipment/equipment").then(m => m.Equipment)
      },
      {
        path: "search",
        loadComponent: () => import("./pages/search/search").then(m => m.Search)
      },
      {
        path: "control/:param/:id",
        canActivate: [authGuard],
        data: {minRole: 2},
        loadComponent: () => import("./pages/control/control").then(m => m.Control)
      },
      {
        path: "settings",
        loadComponent: () => import("./pages/settings/settings").then(m => m.Settings)
      },
    ]
  },
  {path: "**", redirectTo: "/equipment/department/0"}
]
