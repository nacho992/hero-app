import { Component, OnInit } from '@angular/core';
import { Comic } from '../../../interfaces/Comic.interface'
import { MarvelService } from 'src/app/services/marvel.service';
import { take } from 'rxjs/operators';
import { ResponseComics } from 'src/app/interfaces/responseComics.interface';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit {

  comic: Comic[] = []

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.getComics();
  }

  
  private getComics(): void{
    this.marvelService.getComics()
    .pipe(take(1))
    .subscribe(( res: ResponseComics ) => {
      if (!res?.data?.results.length) {
        this.comic = []
      }
      if (res?.data?.results.length) {
        this.comic = [...this.comic, ...res.data.results];
      }
    })
  }

}
