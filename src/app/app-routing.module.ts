import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path: '', 
    loadChildren: () => import('./views/pages/hosting-recap/hosting-recap.module').then(m => m.HostingRecapModule)
  },
  // { 
  //   path: 'e',
  //   component: BaseComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'hosting-recap',
         
  //     },

  //     { path: '', redirectTo: 'hosting-recap', pathMatch: 'full' },
  //     { path: '**', redirectTo: 'hosting-recap', pathMatch: 'full' }
  //   ]
  // },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
