import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { CharacterCardComponent } from './character-card/character-card.component';

const myComponent = [
  CharacterDetailsComponent,
  CharactersListComponent,
  CharacterCardComponent
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
