import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/Character.interface';
import { ResponseCharacters } from 'src/app/interfaces/responseCharacters.interface';
import { MarvelService } from 'src/app/services/marvel.service';
import { Location } from '@angular/common';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  allCharacters: { [page: number]: Character[] } = {};

  characters: Character[] = [];

  paramOk: boolean = false;

  query: string;

  page: number = 1;

  offSet: number = 0;

  collectionSize: number;

  constructor(
    private characterService: MarvelService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.onUrlChanged();
  }

  ngOnInit(): void {}

  public onPageChange(page: number) {
    /*     This method is called every time the page is changed,
     if there are already elements in the page that is passed
     as parameters, it will look for them in the vector, otherwise it makes the corresponding calls
     */
    const characters: Character[] = this.getCharactersPage(page);
    this.characters = [];
    this.offSet += 20;
    if (characters?.length > 0 && characters !== undefined) {
      this.characters = characters;
    } else {
      if (this.query === undefined) {
        this.getDataService(this.offSet);
      } else {
        this.getCharactersByQuery();
      }
    }
  }

  private getCharactersPage(page: number): Character[] {
    /* 
    method in charge of seeing if there are elements in a page,
    if there are not, it returns an empty array */
    if (
      this.allCharacters[page]?.length > 0 &&
      this.allCharacters !== undefined
    ) {
      return this.allCharacters[this.page];
    } else {
      return [];
    }
  }

  private onUrlChanged(): void {
    /* 
   if there is any change in the url,
   the elements of the page are prescribed and the method will be called
   to look for elements that match the parameter by url */
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.paramOk = false;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void {
    /* if there is a parameter by url, the query is made to the api  */
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.query = params['q'];
      if (this.query !== undefined) {
        this.paramOk = true;
        this.characters = [];
        this.characterService
          .searchCharacters(this.query, this.offSet)
          .pipe(take(1))
          .subscribe((res: ResponseCharacters) => {
            this.collectionSize = res.data.total;
            this.allCharacters[this.page] = [...res.data.results];
            this.characters = this.allCharacters[this.page];
          });
      } else {
        this.getDataService(this.offSet);
      }
    });
  }

  private getDataService(skip: number): void {
    this.characterService
      .getAllcharacters(skip)
      .pipe(take(1))
      .subscribe((res: ResponseCharacters) => {
        if (!res?.data?.results.length) {
          this.allCharacters = {};
          this.characters = [];
        }
        if (res?.data?.results.length) {
          this.collectionSize = res.data.total;
          this.allCharacters[this.page] = [...res.data.results];
          this.characters = this.allCharacters[this.page];
          this.offSet += 20;
        }
      });
  }

  onGoBack(): void {
    this.location.back();
  }
}
