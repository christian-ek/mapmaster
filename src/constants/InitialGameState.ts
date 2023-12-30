import { GameState, GameStage, GameMode } from '../interfaces/GameState';

export const initialState: GameState = {
  selectedPosition: undefined,
  wantedCountry: undefined,
  clickWindowContent: undefined,
  gameStage: GameStage.Instructions,
  showClickWindow: false,
  isCorrectGuess: false,
  roundNumber: 0,
  points: {
    roundPoints: 0,
    totalPoints: 0,
    netRoundPoints: 0,
    usedClue: false,
  },
  gameMode: GameMode.World,
};

export default initialState;
