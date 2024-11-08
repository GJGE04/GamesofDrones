import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  number_of_rounds: number = 0;
  rounds_to_win: number = 0;

  player1: string = '';
  player2: string = '';
  
  game: any = null;  
  finished: boolean = false;

  elements: string[] = [];
  rules: any = null;

  roundResults: string[] = []; 

  constructor(private gamesService: GamesService) {}

  ngOnInit() { 
    this.number_of_rounds = this.gamesService.get_Number_of_rounds();
    this.rounds_to_win = this.gamesService.get_Rounds_to_win();
    console.log(`The player must win ${this.rounds_to_win} rounds`);  

    this.elements = this.gamesService.get_Elements();
    this.rules = this.gamesService.get_Rules();
  }

startGame(): void {
  console.log('Applying startGame function');
  if (this.player1 && this.player2) {
    this.game = this.gamesService.startGame2(this.player1, this.player2);

    console.log('Game started:', this.game);  
  } else {
    console.error('Please enter the names of both players.');
  }
}

playRound(): void {
  console.log('Applying playRound function ' + this.game.round);
 
  if (this.game.round <= this.number_of_rounds) {   
    if (this.game && this.game?.player1Choice && this.game?.player2Choice) {
      const roundResult = this.applyRound();
      
      if (roundResult !== 'Draw') {
        this.game.round += 1; 
      }
 
      this.game.player1Choice = '';
      this.game.player2Choice = '';
    } else {
      console.error('Both players must make their choice before continuing.');
    }
  }
 
  if (this.game.player1Score === this.rounds_to_win || this.game.player2Score === this.rounds_to_win) {   
    console.log('One player reached the points, game over!');
    this.finalizeGame();
    this.game.finished = true;
  }
}

applyRound(): string {
  console.log('Applying applyRound function');
  let result = '';
  if (this.game) {
    result = this.evaluateRound(this.game.player1Choice, this.game.player2Choice);
    if (result === 'player 1 wins') {
      this.game.player1Score += 1;
    } else if (result === 'player 2 wins') {
      this.game.player2Score += 1;
    }
  }
  
  this.roundResults.push(`Round ${this.game.round + 1 } Winner: ${result === 'Draw' ? 'No one (Draw)' : result === 'player 1 wins' ? this.game.player1 : this.game.player2}`);
  return result;
}

evaluateRound(player1Choice: string, player2Choice: string): string {
  if (player1Choice === player2Choice) {
    return 'Draw';
  }

  if (this.rules[player1Choice] && this.rules[player1Choice].includes(player2Choice)) {
    return 'player 1 wins';
  } else if (this.rules[player2Choice] && this.rules[player2Choice].includes(player1Choice)) {
    return 'player 2 wins';
  }
  else {
    return 'Draw';
  }
}

finalizeGame(): void {
  console.log('Applying applyRound finalizeGame');
  if (this.game) {
    if (this.game.player1Score > this.game.player2Score) {
      console.log('Player 1 is the Winner!');
      this.game.result = `¡${this.game.player1} wins the game!`;
    } else if (this.game.player2Score > this.game.player1Score) {
      console.log('Player 2 is the Winner!');
      this.game.result = `¡${this.game.player2} wins the game!`;
    } else {
      console.log('Tied game!');
      this.game.result = '¡Tied game!';
    }
    console.log(`Result: ${this.game.result}`);

    this.gamesService.insertIntoDB(this.player1, this.player2, this.game.player1Score, this.game.player2Score, this.game.result).then(game => {
      this.game = game;  
      console.log('Result saved in database:', game);  
    }).catch(error => {
      console.error('Error: ', error);
    });
  }
}

selectPlayerChoice(player: number, choice: string) {
  if (this.game && this.game.round <= this.number_of_rounds) {
    if (player === 1 && !this.game.player1Choice) {
      this.game.player1Choice = choice;
      console.log(`Player 1 chose: ${choice}`);
    } else if (player === 2 && !this.game.player2Choice) {
      this.game.player2Choice = choice;
      console.log(`Player 2 chose: ${choice}`);
    }
  }
}

  resetGame(): void {
    this.game = null;
    this.finished = false;
    this.roundResults = [];  
    
    this.game = this.gamesService.startGame2(this.player1, this.player2);
    console.log('New game started:', this.game);
  }

  resetGameWithNewPlayers(): void {
    this.game = null;  
    this.finished = false;
    this.roundResults = [];  

    this.player1 = '';
    this.player2 = '';

    // Iniciar un nuevo juego
    console.log('New game with new players started:');
  }
  
}

 

  
