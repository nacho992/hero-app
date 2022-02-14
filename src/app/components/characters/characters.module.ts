import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

const myComponent = [
  CharacterDetailsComponent,
  CharactersListComponent
]
@NgModule({
  declarations: [...myComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
  ],
  exports: [...myComponent]
})
export class CharactersModule { }
