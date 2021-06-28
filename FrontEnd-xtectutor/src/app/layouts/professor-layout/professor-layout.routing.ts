import { Routes } from '@angular/router';
import { ProfesorProfileComponent } from 'app/pages/professor-pages/profesor-profile/profesor-profile.component';
import { SearchComponent } from 'app/pages/professor-pages/search/search.component';


export const ProfessorLayoutRoutes: Routes = [
    { path: 'search',      component: SearchComponent },
    { path: 'professor-profile', component: ProfesorProfileComponent}
];
