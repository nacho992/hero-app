import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from "@angular/common/http";
import { ComicsModule } from './components/comics/comics.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavouritesComponent } from './components/favourites/favourites.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComicsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
