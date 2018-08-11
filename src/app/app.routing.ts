import { Routes } from '@angular/router';

import { BlankComponent, FullComponent } from '@app/shared';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
