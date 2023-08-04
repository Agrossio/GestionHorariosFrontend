import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceptRejectBoxComponent } from './components/accept-reject-box/accept-reject-box.component';
import { ButtonComponent } from './components/button/button.component';
import { CreateEditClientModalComponent } from './components/create-edit-client-modal/create-edit-client-modal.component';
import { CreateEditProjectModalComponent } from './components/create-edit-project-modal/create-edit-project-modal.component';
import { CreateEditUserModalComponent } from './components/create-edit-user-modal/create-edit-user-modal.component';
import { DetailBoxComponent } from './components/detail-box/detail-box.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { TaskDetailUserComponent } from './components/task-detail-user/task-detail-user.component';
import { UserApplicationModalComponent } from './components/user-application-modal/user-application-modal.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { LoginAndRegisterComponent } from './pages/login-and-register/login-and-register.component';
import { ProjectAdminViewComponent } from './pages/project-admin-view/project-admin-view.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CreateEditTaskModalComponent } from './components/create-edit-task-modal/create-edit-task-modal.component';
import { CreateEditSprintModalComponent } from './components/create-edit-sprint-modal/create-edit-sprint-modal.component';
import { CalendarInputComponent } from './components/calendar-input/calendar-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { ReportedAlertsModalComponent } from './components/reported-alerts-modal/reported-alerts-modal.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { UsersIconNavbarComponent } from './components/users-icon-navbar/users-icon-navbar.component';
import { ProjectsIconNavbarComponent } from './components/projects-icon-navbar/projects-icon-navbar.component';
import { ClientsIconNavbarComponent } from './components/clients-icon-navbar/clients-icon-navbar.component';
import { RegisterComponent } from './pages/login-and-register/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileIconNavbarComponent } from './components/profile-icon-navbar/profile-icon-navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login-and-register/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CreateEditMonthsModalComponent } from './components/create-edit-months-modal/create-edit-months-modal.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarIconNavbarComponent } from './components/calendar-icon-navbar/calendar-icon-navbar.component'
import { LoaderComponent } from './components/loader/loader.component';
import { FilterPipe } from './pipes/filter.pipe';
import { InConstructionComponent } from './pages/in-construction/in-construction.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { ListPageHeaderComponent } from './components/list-page-header/list-page-header.component';
import { ProjectDetailInListComponent } from './components/project-detail-in-list/project-detail-in-list.component';
import { AssignTaskModalComponent } from './components/assign-task-modal/assign-task-modal.component';
import { EditStatusTaskModalComponent } from './components/edit-status-task-modal/edit-status-task-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListTaksByProjectComponent } from './components/list-taks-by-project/list-taks-by-project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAndRegisterComponent,
    UserProfileComponent,
    ProjectListComponent,
    TaskListComponent,
    ProjectDetailComponent,
    UserListComponent,
    ProjectAdminViewComponent,
    ClientListComponent,
    ClientDetailComponent,
    ButtonComponent,
    NavbarComponent,
    SearchContainerComponent,
    CreateEditUserModalComponent,
    UserApplicationModalComponent,
    DetailBoxComponent,
    AcceptRejectBoxComponent,
    CreateEditProjectModalComponent,
    CreateEditClientModalComponent,
    TaskDetailUserComponent,
    CreateEditTaskModalComponent,
    CreateEditSprintModalComponent,
    CalendarInputComponent,
    CalendarIconNavbarComponent,
    PasswordInputComponent,
    ReportedAlertsModalComponent,
    SimpleInputComponent,
    UsersIconNavbarComponent,
    ProjectsIconNavbarComponent,
    ClientsIconNavbarComponent,
    ProfileIconNavbarComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    UnauthorizedComponent,
    CreateEditMonthsModalComponent,
    CalendarComponent,
    FilterPipe,
    LoaderComponent,
    FilterPipe,
    InConstructionComponent,
    DonutChartComponent,
    ListPageHeaderComponent,
    ProjectDetailInListComponent,
    AssignTaskModalComponent,
    EditStatusTaskModalComponent,
    ListTaksByProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [CreateEditProjectModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
