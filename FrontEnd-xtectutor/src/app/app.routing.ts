import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProfessorLayoutComponent } from './layouts/professor-layout/professor-layout.component';

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
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},

  {
    path: '',
    component: ProfessorLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/professor-layout/professor-layout.module#ProfessorLayoutModule'
  }]},

  {
    path: '**',
    redirectTo: ''
  }
]
