import { Routes } from '@angular/router';
import { AuthenticationGuard } from '@app/core';

import { DashboardComponent } from '@app/dashboard/dashboard/dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      }
    ]
  }
];
