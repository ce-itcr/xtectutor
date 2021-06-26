import { Routes } from '@angular/router';
import { TermsComponent } from 'app/pages/student-pages/terms/terms.component';

import { HomeComponent } from '../../pages/student-pages/home/home.component';
import { UserComponent } from '../../pages/student-pages/user/user.component';

export const StudentLayoutRoutes: Routes = [
    { path: 'home',      component: HomeComponent },
    { path: 'user',      component: UserComponent },
    //{ path: 'info',      component: InfoComponent},
    { path: 'terms',     component: TermsComponent} 
];
