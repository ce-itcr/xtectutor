import { Routes } from '@angular/router';
import { CategoriesComponent } from 'app/pages/admin-pages/categories/categories.component';
import { InfoComponent } from 'app/pages/admin-pages/info/info.component';
import { ProfileComponent } from 'app/pages/admin-pages/profile/profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'categories',     component: CategoriesComponent },
    { path: 'profile',        component: ProfileComponent },
    { path: 'info',           component: InfoComponent}
];
