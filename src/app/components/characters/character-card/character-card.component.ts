import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/Character.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() character: Character;

  constructor(private localStorageSvc: StorageService) { }
  getIcon(): string {
    return this.character.isFavorite ? 'heart-fill.svg' : 'heart.svg';
  }

  toggleFavorite(): void {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStorageSvc.addOrRemoveFavorite(this.character);
  }

  ngOnInit(): void {
  }

}
