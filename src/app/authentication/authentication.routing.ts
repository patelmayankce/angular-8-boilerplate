import { Routes } from '@angular/router';

import { NotFoundComponent } from '@app/authentication/404/not-found.component';
import { LoginComponent } from '@app/authentication/login/login.component';
import { SignupComponent } from '@app/authentication/signup/signup.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];
