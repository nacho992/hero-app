import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/Character.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public favs: Character[]

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.storage.charactersFav$.subscribe(res => {
      this.favs = res
    })
  }

  getIcon(character: Character): string {
    return character.isFavorite ? 'heart-fill.svg' : 'heart.svg';
  }

  toggleFavorite(character: Character): void {
    const isFavorite = character.isFavorite;
    this.getIcon(character);
    character.isFavorite = !isFavorite;
    this.storage.addOrRemoveFavorite(character);
  }

}
