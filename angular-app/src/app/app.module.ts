import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameOneComponent } from './game-one/game-one.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    GamesListComponent,
    GameOneComponent,
    RegisterComponent,
    NavigationComponent,
    FooterComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,

    RouterModule.forRoot([
      {
        path:"",
        component:WelcomeComponent
      },
      {
        path:"games",
        component:GamesListComponent
      },
      {
        path:"games/:gameId",
        component:GameOneComponent
      },
      {
        path:"register",
        component:RegisterComponent
      },
      {
        path:"**",
        component:ErrorPageComponent
      }
    ])
  ],
  providers: [{provide:JWT_OPTIONS, useValue:JWT_OPTIONS}, JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
