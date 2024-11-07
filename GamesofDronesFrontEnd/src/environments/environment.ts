
export const environment = {
    apiUrl: 'http://localhost:5034/api/games',  
    number_of_rounds: 5,
    rounds_to_win: 3,
    gameElements: ['rock', 'paper', 'scissors', 'string', 'dog'],  
    gameRules: {
      rock: ['scissors', 'string'],     
      paper: ['rock', 'dog'],       
      scissors: ['paper', 'string'],      
      string: ['paper', 'dog'],       
      dog: ['rock', 'scissors']       
    }
  };
  