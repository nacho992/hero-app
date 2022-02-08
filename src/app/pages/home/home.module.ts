import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersModule } from 'src/app/components/characters/characters.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CardSearchComponent } from 'src/app/components/card-search/card-search.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardSearchComponent
  ],
  imports: [
    CommonModule,
    CharactersModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
