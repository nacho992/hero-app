import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from 'src/app/interfaces/Character.interface';
import { MarvelService } from 'src/app/services/marvel.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private charService: MarvelService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe( (params) => {
      const id = params['id'];
      this.character$ = this.charService.getDetails(id);
      console.log(this.character$.subscribe(res => console.log(res)))
    } )
  }

  onGoBack():void {
    this.location.back();
  }
}
