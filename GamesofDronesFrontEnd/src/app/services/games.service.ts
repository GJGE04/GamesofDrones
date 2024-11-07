import axios, {AxiosResponse} from 'axios';
import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private apiUrl = environment.apiUrl;

   constructor() { }

   ngOnInit() {
    console.log(this.apiUrl);  
  } 

  get_Number_of_rounds(): number {
    return environment.number_of_rounds;
  }

  get_Rounds_to_win(): number {
    return environment.rounds_to_win;
  }

  get_Elements(): string[] {
    return environment.gameElements;
  }

  get_Rules(): any {
    return environment.gameRules;
  }

  startGame2(player1: string, player2: string): Game {
    console.log('Begining the game');
  
    const gameData: Game = { 
      player1: player1, 
      player2: player2, 
      player1Choice: '', 
      player2Choice: '', 
      player1Score: 0, 
      player2Score: 0, 
      round: 0, 
      result: '',
      finished: false
    };
    return gameData;
  }

    insertIntoDB(player1: string, player2: string, player1Score: number, player2Score: number, result: string): Promise<Game> {
    console.log('Invoke endpoint ' + `${this.apiUrl}/insertInDB`);
    const gameData: Game = { 
      player1: player1, 
      player2: player2, 
      player1Choice: '', 
      player2Choice: '', 
      player1Score: player1Score, 
      player2Score: player2Score, 
      round: environment.number_of_rounds, 
      result: result,
      finished: true 
    };
    
    return axios.post(`${this.apiUrl}/insertIntoDB`, gameData)
    .then((response: AxiosResponse<Game>) => {
      const modifiedGame = response.data;
      modifiedGame.round = environment.number_of_rounds - 1;
      return response.data;
    }) 
      .catch(error => {
        console.error('Error in insertIntoDB function:', error);
        throw error;  
      });
  }
}
