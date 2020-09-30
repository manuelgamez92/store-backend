import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {path:'', component:HomeComponent,data:{ breadcrumb:'Home'}},
  {path:'shop', loadChildren:()=> import('./shop/shop.module').then(mod=>mod.ShopModule),data:{ breadcrumb:'Shop'}},
  {path:'test-error', component: TestErrorComponent, data:{ breadcrumb:'Text Errors'}},
  {path:'server-error', component: NotFoundComponent, data:{ breadcrumb:'Text Errors'}},
  {path:'**',  redirectTo:'' , pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
