import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/Character.interface';
import { ResponseCharacters } from 'src/app/interfaces/responseCharacters.interface';
import { MarvelService } from 'src/app/services/marvel.service';
import { Location } from "@angular/common";
import { filter, take } from "rxjs/operators";

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters: Character[] = []

  showGoUpButton = false

  paramOk = false

  query = '';

  private hideScrollHeight = 200;

  private showScrollHeight = 500;

  constructor(private characterService: MarvelService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location)
  {
    this.onUrlChanged()
   }

  ngOnInit(): void {
    this.getDataService();
  }

  private onUrlChanged(): void{
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.characters = [];
      this.paramOk = false;
      this.getCharactersByQuery();
    })
    
  }

  private getCharactersByQuery(): void{
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.query = params['q'];
      if (this.query != '') {
        this.paramOk = true;
        this.characters = []
        console.log(this.query)
        this.characterService.searchCharacters(this.query).pipe(take(1))
        .subscribe(res => {
          this.characters = [...res.data.results]
        })
        console.log(this.characters)
      }else{
        this.getDataService();
      }
    })
  }

  private getDataService(): void {
    this.characterService.getAllcharacters()
    .pipe(take(1))
    .subscribe(( res: ResponseCharacters ) => {
      if (!res?.data?.results.length) {
        this.characters = []
      }
      if (res?.data?.results.length) {
        this.characters = [...this.characters, ...res.data.results];
      }
    })
  }

  onGoBack():void {
    this.location.back();
  }

}