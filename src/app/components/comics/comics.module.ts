import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ComicsListComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComicsModule { }
