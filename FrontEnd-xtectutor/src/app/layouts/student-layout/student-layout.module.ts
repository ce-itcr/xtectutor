import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentLayoutRoutes } from './student-layout.routing';

import { HomeComponent }       from '../../pages/student-pages/home/home.component';
import { UserComponent }            from '../../pages/student-pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EntriesTableComponent } from 'app/data-tables/entries-table/entries-table.component';
import { MyEntriesTableComponent } from 'app/data-tables/my-entries-table/my-entries-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { InfoComponent } from 'app/pages/admin-pages/info/info.component';
import { TermsComponent } from 'app/pages/student-pages/terms/terms.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentLayoutRoutes),
    FormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    InfoComponent,
    TermsComponent,
    EntriesTableComponent,
    MyEntriesTableComponent
  ]
})

export class StudentLayoutModule {}
