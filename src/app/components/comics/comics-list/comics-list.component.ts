import { Component, OnInit } from '@angular/core';
import { Comic } from '../../../interfaces/Comic.interface';
import { MarvelService } from 'src/app/services/marvel.service';
import { take } from 'rxjs/operators';
import { ResponseComics } from 'src/app/interfaces/responseComics.interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss'],
})
export class ComicsListComponent implements OnInit {
  comic: Comic[] = [];

  public option: boolean = false;

  datos: FormGroup
  constructor(private marvelService: MarvelService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.datos = this.fb.group({
      radio: ['option1', [Validators.required]],
      inputSearch: ['', [Validators.required, Validators.minLength(4)]],
    });
  
    this.getComics();

  }

  public search(): void {
    if (this.datos.get('radio').value === 'option1') {
      console.log(
        'Buscar por personaje--->>',
        this.datos.get('inputSearch').value
      );
    }else{
      console.log('Buscar por fechas')
    }
  }

  private getComics(): void {
    this.marvelService
      .getComics()
      .pipe(take(1))
      .subscribe((res: ResponseComics) => {
        if (!res?.data?.results.length) {
          this.comic = [];
        }
        if (res?.data?.results.length) {
          this.comic = [...this.comic, ...res.data.results];
        }
      });
  }
}
