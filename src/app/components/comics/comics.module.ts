import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { RouterModule } from '@angular/router';
import { DatepikerComponent } from '../datepiker/datepiker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [ComicsListComponent, DatepikerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class ComicsModule { }
