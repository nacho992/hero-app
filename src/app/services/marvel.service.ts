import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ResponseCharacters } from '../interfaces/responseCharacters.interface';
import { Character } from '../interfaces/Character.interface';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  hash_key = '24e9e11104587384a175f7ac947b5286'

  constructor(private http: HttpClient) { }

  getAllcharacters(): Observable<ResponseCharacters>{
    return this.http.get<ResponseCharacters>(environment.BASE_URL_MARVEL + 
                                            `/v1/public/characters?ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)
      .pipe( (data: any) => data);
  }

  getDetails(id: number): Observable<any>{
    return this.http.get<any>(environment.BASE_URL_MARVEL + 
                                          `/v1/public/characters/${id}?ts=1&apikey=${environment.PUBLIC_KEY_MARVEL}&hash=${this.hash_key}`)

        .pipe( (data: any) => data)
  }
}
