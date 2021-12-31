import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostingRecapComponent } from './hosting-recap.component';
import { RouterModule, Routes } from '@angular/router';
import { CredentialsComponent } from './credentials/credentials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HostingRecapComponent,
  }
]

@NgModule({
  declarations: [HostingRecapComponent, CredentialsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HostingRecapModule { }
