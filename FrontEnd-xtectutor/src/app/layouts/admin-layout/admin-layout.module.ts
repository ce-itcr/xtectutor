import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent }       from '../../pages/student-pages/home/home.component';
import { UserComponent }            from '../../pages/student-pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProfileComponent } from 'app/pages/admin-pages/profile/profile.component';
import { CategoriesComponent } from 'app/pages/admin-pages/categories/categories.component';
import { AdminsTableComponent } from 'app/data-tables/admins-table/admins-table.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    ProfileComponent,
    CategoriesComponent,
    AdminsTableComponent
  ]
})

export class AdminLayoutModule {}
