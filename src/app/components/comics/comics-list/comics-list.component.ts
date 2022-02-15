import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Comic } from '../../../interfaces/Comic.interface';
import { MarvelService } from 'src/app/services/marvel.service';
import { take } from 'rxjs/operators';
import { ResponseComics } from 'src/app/interfaces/responseComics.interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss'],
})
export class ComicsListComponent implements OnInit {

  showGoUpButton = false
  moreData = false
  comic: Comic[] = []
  dateFrom: NgbDateStruct
  dateTo: NgbDateStruct
  offset = 0
  datos: FormGroup
  private hideScrollHeight = 200;

  private showScrollHeight = 500;

  constructor(
     @Inject(DOCUMENT) private document: Document,
     private marvelService: MarvelService,
     private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.datos = this.fb.group({
      radio: ['option1', [Validators.required]],
      inputSearch: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.getComics();
  }

  public dateFromInput(event){
    this.dateFrom = event
    this.comic = []
    if (this.dateFrom && this.dateTo) {
      this.moreData = false;
      this.getComicsRange();
    }
  }

  public dateToInput(event){
    this.dateTo = event
  }

  public search(): void {
    this.comic = []
    if (this.datos.get('radio').value === 'option1') {
      this.getComicWithTitle(this.datos.get('inputSearch').value)
    }
  }

  /*-------------- Consum servise Marvel-------------- */
  private getComicsRange(): void{
    this.marvelService.getComicsdateRange(this.dateFrom, this.dateTo, this.offset)
      .pipe(take(1))
      .subscribe( (res: ResponseComics) => {
        if (!res?.data?.results.length) {
          this.comic = [];
        }
        if (res?.data?.results.length) {
          this.comic = [...this.comic, ...res.data.results];
          this.moreData = true
        }
      })
  }

  private getComicWithTitle(title: string): void{
    this.marvelService.getComicsWithCharacter(title,this.offset)
      .pipe(take(1))
      .subscribe( (res: ResponseComics) => {
        if (!res?.data?.results.length) {
          this.comic = [];
        }
        if (res?.data?.results.length) {
          this.comic = [...this.comic, ...res.data.results];
          this.moreData = true
        }
      })
  }

  private getComics(): void {
    this.marvelService
      .getComics(this.offset)
      .pipe(take(1))
      .subscribe((res: ResponseComics) => {
        if (!res?.data?.results.length) {
          this.comic = [];
        }
        if (res?.data?.results.length) {
          this.comic = [...this.comic, ...res.data.results];
          console.log(this.comic[4])
          this.moreData = true
        }
      });
  }

  //------INFINITE SCROLL-----------
  @HostListener('window:scroll', [])
  onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScrollDown():void{
    if (this.moreData) {
      this.offset += 20;
      console.log(this.offset)
      if (this.dateFrom && this.dateTo) {
        this.getComicsRange();
      }
      if ((this.datos.get('radio').value === 'option1') && this.datos.get('inputSearch').value !== '') {
        this.getComicWithTitle(this.datos.get('inputSearch').value)
      }
      if (this.datos.invalid && (!this.dateFrom && !this.dateTo)) {
        this.getComics();
      }
    }
  }

  onScrollTop():void{
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }
}
