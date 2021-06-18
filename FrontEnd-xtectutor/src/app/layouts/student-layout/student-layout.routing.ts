import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/student-pages/home/home.component';
import { UserComponent } from '../../pages/student-pages/user/user.component';

export const StudentLayoutRoutes: Routes = [
    { path: 'home',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
];
