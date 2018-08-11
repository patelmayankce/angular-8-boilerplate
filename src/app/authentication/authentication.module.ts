import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from '@app/authentication/404/not-found.component';
import { AuthenticationRoutes } from '@app/authentication/authentication.routing';
import { LoginComponent } from '@app/authentication/login/login.component';
import { SignupComponent } from '@app/authentication/signup/signup.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    SharedModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  declarations: [NotFoundComponent, SignupComponent, LoginComponent]
})
export class AuthenticationModule {}
