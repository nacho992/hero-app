import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'character-list',
    loadChildren: () => import('./components/characters/characters-list/characters-list.module').then(m => m.CharactersListModule)
  },
  {
    path: 'comics-list',
    loadChildren: () => import('./components/comics/comics-list/comics-list.module').then(m => m.ComicsListModule)
  },
  {
    path: 'character-details/:id', 
    loadChildren: () => import('./components/characters/character-details/character-details.module').then(m => m.CharacterDetailsModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
