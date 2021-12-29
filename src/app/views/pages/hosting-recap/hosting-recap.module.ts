import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostingRecapComponent } from './hosting-recap.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HostingRecapComponent,
  }
]

@NgModule({
  declarations: [HostingRecapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HostingRecapModule { }
