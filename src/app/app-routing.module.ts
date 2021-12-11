import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RoutesGuard } from './routes.guard';

const routes: Routes = [

  {path:'',redirectTo:'profile',pathMatch:"full"},
  {path:'profile',canActivate:[RoutesGuard],component:ProfileComponent},
  {path:'signin',component:SignInComponent},
  {path:'signup',component:SignUpComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
