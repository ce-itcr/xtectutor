import { Routes } from '@angular/router';
import { InfoComponent } from 'app/pages/admin-pages/info/info.component';

import { HomeComponent } from '../../pages/student-pages/home/home.component';
import { UserComponent } from '../../pages/student-pages/user/user.component';

export const StudentLayoutRoutes: Routes = [
    { path: 'home',      component: HomeComponent },
    { path: 'user',      component: UserComponent },
    { path: 'info',      component: InfoComponent}
];
