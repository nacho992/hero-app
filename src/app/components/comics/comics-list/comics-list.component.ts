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

  datos: FormGroup = this.fb.group({
    radio1: [true, [Validators.required]],
    radio2: [false, [Validators.required]],
    inputSearch: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private marvelService: MarvelService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getComics();
    console.log(this.datos.value);
  }

  public search(): void {
    if (!this.datos.get('radio1').invalid) {
      console.log(
        'Buscar por personaje--->>',
        this.datos.get('inputSearch').value
      );
    }

    if (!this.datos.get('radio2').invalid) {
      //verify date
      console.log('Buscar entre dos fechas');
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
