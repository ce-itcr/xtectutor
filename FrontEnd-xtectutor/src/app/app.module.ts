import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';

import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProfessorLayoutComponent } from "./layouts/professor-layout/professor-layout.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentLayoutComponent,
    AdminLayoutComponent,
    ProfessorLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
