import { Country } from './Country';

export enum GameStage {
  Instructions,
  GameModeSelection,
  Countdown,
  Running,
  RoundWon,
  GameOver,
}

export enum GameMode {
  World = 'World',
  Africa = 'Africa',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'NorthAmerica',
  Oceania = 'Oceania',
  SouthAmerica = 'SouthAmerica',
}

export interface Points {
  totalPoints: number;
  roundPoints: number;
  netRoundPoints: number;
  usedClue: boolean;
}

export interface GameState {
  selectedPosition: google.maps.LatLng | undefined;
  wantedCountry: Country | undefined;
  clickWindowContent: Country | string | undefined;
  gameStage: GameStage;
  showClickWindow: boolean;
  isCorrectGuess: boolean;
  roundNumber: number;
  points: Points;
  gameMode: GameMode;
}
