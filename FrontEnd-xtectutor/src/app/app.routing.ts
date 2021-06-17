import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: StudentLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/student-layout/student-layout.module#StudentLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: ''
  }
]
