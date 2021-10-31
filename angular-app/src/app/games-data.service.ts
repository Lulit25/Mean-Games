import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Games } from './games-list/games-list.component';
import {Game}  from './game-one/game-one.component';
import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private apiBaseUrl: string = "http://localhost:3000/api"

  constructor(private httpClient:HttpClient) { }

  public getGames():Promise<Games[]>{
    const url :string =this.apiBaseUrl+"/games";
   return this.httpClient.get(url).toPromise().then(response=> response as Games[])
    .catch(this.handleError)
  }
  public addUser(user:User):Promise<User>{
    const url :string =this.apiBaseUrl+"/users";
    return this.httpClient.post(url, user).toPromise().then(response=> response as User)
    .catch(this.handleError)
  }

  public addGame(game:Game):Promise<Game>{
    const url :string =this.apiBaseUrl+"/games";
    return this.httpClient.post(url, game).toPromise().then(response=> response as Game)
    .catch(this.handleError)
  }
  public getOneGame(gameId:string): Promise<Game>{
    const url: string =this.apiBaseUrl+"/games/" +gameId;
    return this.httpClient.get(url).toPromise()
    .then(response => response as Game)//cast it to game array
    .catch(this.handleError);
  }
  public updateOneGame(gameId:string, game:Game): Promise<Game>{
    const url: string =this.apiBaseUrl+"/games/" +gameId;
    return this.httpClient.put(url, game).toPromise()
    .then(response => response as Game)//cast it to game array
    .catch(this.handleError);
  }
  public deleteOneGame(gameId:string): Promise<Game>{
    const url: string =this.apiBaseUrl+"/games/" +gameId;
    return this.httpClient.delete(url).toPromise()
    .then(response => response as Game)//cast it to game array
    .catch(this.handleError);
  }
  private handleError(error:any): Promise<any>{
    console.log("error",error);
    return Promise.reject(error.messsage ||error);

    
  }

}
