import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewChild } from '@angular/core';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent implements OnInit {
  @ViewChild('updateGameForm')
  updateGameForm!:NgForm
  game!:Game;
  routeParams!: Params;
   gameId!:string;
   rating:Number[] =new Array(3);
  constructor(private gamesDataService:GamesDataService,
    private activatedRoute:ActivatedRoute) {      
       this.getRouteParams();
    }
    getRouteParams() {
      this.activatedRoute.params.subscribe( params => {
          this.routeParams = params;
          this.gameId=this.routeParams.gameId;
      });
    }

  ngOnInit(): void {
    this.gamesDataService.getOneGame(this.gameId).then(response => this.game=response);
    this.game={
      _id:"",
      title:"",
      price:0,
      year:2021,
      minPlayers:1,
      maxPlayers:1,
      minAge:1,
      rate:0
    }
    // this.rating= new Array(this.game.rate);

  }
  onSubmit(updateGameForm:NgForm):void{
    this.game ={
      _id: this.gameId,
      title:this.updateGameForm.value.title,
      price:this.updateGameForm.value.price,
      year:this.updateGameForm.value.year,
      minPlayers:this.updateGameForm.value.minPlayers,
      maxPlayers:this.updateGameForm.value.maxPlayers,
      minAge:this.updateGameForm.value.minAge,
      rate:this.updateGameForm.value.rate,
    }
    this.gamesDataService.updateOneGame(this.gameId, this.game).then(function (response:any) {
      console.log("Game Updated", response);

    console.log(updateGameForm.value);
    // console.log("user", this.user);  
    });
    window.location.reload();
  }
  onClear(form:NgForm):void{
    form.resetForm();
  }

}

export class Game{
  _id!:string
  title!:string
  price!:number
  year!:number
  minPlayers!:number;
  maxPlayers!:number;
  minAge!:number;
  rate!:Number;

}
