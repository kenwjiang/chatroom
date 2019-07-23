import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialComponent } from './special/special.component';
import { NewUserComponent } from './new-user/new-user.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'new', component: NewUserComponent},
    { path: 'chat', component: ChatComponent},
    { path: 'special', component: SpecialComponent,
    canActivate: [AuthGuard]
    },
    { path: '', pathMatch: 'full', redirectTo: '/new' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
