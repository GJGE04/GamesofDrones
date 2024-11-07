import { Component } from '@angular/core';

import { GamesService } from 'src/app/services/games.service';  // Asegúrate de que el servicio esté importado
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GamesofDronesFrontEnd';

  player1: string = '';
  player2: string = '';
  game: Game | null = null;

  constructor(private gamesService: GamesService) {}

}
