import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from '../game-one/game-one.component';
import { Location } from '@angular/common';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  @ViewChild('addGameForm')
  addGameForm!:NgForm;
  game!:Game;
  SearchText!:string;
  games:Games[]=[];


  constructor(private gamesDataService:GamesDataService, private location: Location) { }

  ngOnInit(): void {
    
    this.gamesDataService.getGames().then((response)=> {
      this.games=response
    }
    
); 
    this.game ={
      _id:"",
      title:"",
      price:0,
      year:2021,
      minPlayers:1,
      maxPlayers:1,
      minAge:1,
      rate:0
    }

  }
   deleteGame (gameId:string):void {
    this.gamesDataService.deleteOneGame(gameId).then(function (response:any) {
        console.log("Game deleted", response);
  
    });
  }
  onSubmit(addGameForm:NgForm):void{
    
    console.log("in add game",addGameForm.value);
    this.gamesDataService.addGame(addGameForm.value).then(function (response:any) {
      console.log("Game Added", response);
    });
  }
  onClear(form:NgForm):void{
    form.resetForm();
  }
}
export class Games{
  _id!:string
  title!:string
  price!:number
  year!:number
  minPlayers!:number;
  maxPlayers!:number;
  minAge!:number;
  rate!:Number;

}
