import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectAdminViewComponent } from './pages/project-admin-view/project-admin-view.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/login-and-register/register/register.component';
import { LoginComponent } from './pages/login-and-register/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { authGuardFn } from './guard/auth-fn.guard';
import {CreateEditMonthsModalComponent} from "./components/create-edit-months-modal/create-edit-months-modal.component";
import {InConstructionComponent} from "./pages/in-construction/in-construction.component";
import { CreateEditTaskModalComponent } from './components/create-edit-task-modal/create-edit-task-modal.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  { path: 'calendar', component: CreateEditMonthsModalComponent, title: 'Calendar', data: {role: ['ADMIN']}, canActivate: [authGuardFn]},
  {path: 'months', component: CreateEditMonthsModalComponent, title: 'Months'},
  {path: 'task', component: CreateEditTaskModalComponent, title: 'Task'},
  {path: 'register', component: RegisterComponent, title: 'Register' },
  {path: 'user-profile', component: UserProfileComponent, title: 'Profile', data: {role: ['ADMIN', 'DEVELOPER', 'MANAGEMENT']}, canActivate: [authGuardFn]},
  {path: 'projects', component: ProjectListComponent, title: 'Projects', data: {role: ['ADMIN', 'DEVELOPER', 'MANAGEMENT']}, canActivate: [authGuardFn]},
  {path: 'projects/:project-id', component: InConstructionComponent, title: 'Project Detail', data: {role: ['DEVELOPER']}, canActivate: [authGuardFn]}, //Vista desarrollador
  {path: 'project-view/:project-id', component: ProjectAdminViewComponent, title: 'Project View', data: {role: ['ADMIN']}, canActivate: [authGuardFn]}, //Vista Admin
  {path: 'clients', component: ClientListComponent, title: 'Clients', data: {role: ['ADMIN']}, canActivate: [authGuardFn]},
  {path: 'clients/:client-id', component: ClientDetailComponent, title: 'Client Detail', data: {role: ['ADMIN']}, canActivate: [authGuardFn]},
  {path: 'task-list/:project-id', component: TaskListComponent, title: 'Tasks', data: {role: ['DEVELOPER', 'ADMIN']}, canActivate: [authGuardFn]},
  {path: 'users', component: UserListComponent, title: 'Users', data: {role: ['ADMIN']}, canActivate: [authGuardFn]},
  {path: 'unauthorized', component:UnauthorizedComponent},
  {path: '**', component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}






