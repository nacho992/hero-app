import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ResponseCharacters } from '../interfaces/responseCharacters.interface';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  hash_key = '24e9e11104587384a175f7ac947b5286'

  constructor(private http: HttpClient) { }

  //----------CHARCATERS-----------------
  getAllcharacters(skip: number): Observable<ResponseCharacters>{
    return this.http.get<ResponseCharacters>(environment.BASE_URL_MARVEL + 
      `/v1/public/characters?offset=${skip}&ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)
      .pipe( (data: any) => data);
  }

  getDetails(id: number): Observable<any>{
    return this.http.get<any>(environment.BASE_URL_MARVEL + 
        `/v1/public/characters/${id}?ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)
        .pipe( (data: any) => data)
  }

  searchCharacters(name: string,skip: number): Observable<ResponseCharacters>{
    return this.http.get<any>(environment.BASE_URL_MARVEL + 
      `/v1/public/characters?offset=${skip}&nameStartsWith=${name}&ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)
      
  }

  //--------------COMICS--------------------
  getComics(skip: number): Observable<any>{
    return this.http.get<ResponseCharacters>(environment.BASE_URL_MARVEL + 
      `/v1/public/comics?offset=${skip}&ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)
      .pipe( (data: any) => data);
  }

  getComicsdateRange(from: NgbDateStruct, to: NgbDateStruct, skip: number): Observable<any>{
    return this.http.get<ResponseCharacters>(environment.BASE_URL_MARVEL + 
      `/v1/public/comics?dateRange=${from.year}-${from.month}-${from.day}%2C${to.year}-${to.month}-${to.day}&offset=${skip}&ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)
      .pipe( (data: any) => data);
  }

  getComicsWithCharacter(title: string, skip: number): Observable<any>{
    return this.http.get<ResponseCharacters>(environment.BASE_URL_MARVEL + 
      `/v1/public/comics?title=${title}&offset=${skip}&ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)
      .pipe( (data: any) => data);
  }
}
