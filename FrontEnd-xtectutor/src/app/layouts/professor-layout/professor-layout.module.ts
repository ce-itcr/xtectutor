import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfessorLayoutRoutes } from './professor-layout.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SearchComponent } from 'app/pages/professor-pages/search/search.component';
import { ProfesorProfileComponent } from 'app/pages/professor-pages/profesor-profile/profesor-profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfessorLayoutRoutes),
    FormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    SearchComponent,
    ProfesorProfileComponent
  ]
})

export class ProfessorLayoutModule {}
