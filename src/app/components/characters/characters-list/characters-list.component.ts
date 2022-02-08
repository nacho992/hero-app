import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/Character.interface';
import { ResponseCharacters } from 'src/app/interfaces/responseCharacters.interface';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters: Character[] = []

  constructor(private characterService: MarvelService) { }

  ngOnInit(): void {
    this.characterService.getAllcharacters().subscribe(( res: ResponseCharacters ) => {
      this.characters = [...this.characters, ...res.data.results];
      console.log(this.characters[0].thumbnail.path)
    })
  }

}