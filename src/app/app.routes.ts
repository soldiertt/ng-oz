import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ManagePersonComponent} from "./admin/person/manage-person.component";


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manage-person', component: ManagePersonComponent}
];

