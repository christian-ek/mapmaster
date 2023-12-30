import { Country } from '../interfaces/Country';
import {
  GameState,
  GameStage,
  Points,
  GameMode,
} from '../interfaces/GameState';
import { initialState } from '../constants/InitialGameState';

export type GameAction =
  | { type: 'START_GAME'; payload: GameMode }
  | { type: 'END_GAME' }
  | { type: 'SET_SELECTED_POSITION'; payload: google.maps.LatLng | undefined }
  | { type: 'SET_CLICK_WINDOW_CONTENT'; payload: Country | string | undefined }
  | { type: 'SET_SHOW_CLICK_WINDOW'; payload: boolean }
  | { type: 'SET_WANTED_COUNTRY'; payload: Country | undefined }
  | { type: 'SET_ROUND_POINTS'; payload: number }
  | { type: 'SET_GAME_STAGE'; payload: GameStage }
  | { type: 'UPDATE_POINTS'; payload: Points }
  | { type: 'CORRECT_GUESS' }
  | { type: 'NEW_ROUND' };

/**
 * Reducer function for managing the game state.
 */
export const GameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameStage: GameStage.Running,
        gameMode: action.payload,
      };

    case 'END_GAME':
      return {
        ...state,
        gameStage: GameStage.GameOver,
      };

    case 'SET_SELECTED_POSITION':
      return {
        ...state,
        selectedPosition: action.payload,
        clickWindowContent: undefined,
      };

    case 'SET_GAME_STAGE':
      return {
        ...state,
        gameStage: action.payload,
      };

    case 'SET_CLICK_WINDOW_CONTENT':
      return { ...state, clickWindowContent: action.payload };

    case 'SET_SHOW_CLICK_WINDOW':
      return { ...state, showClickWindow: action.payload };

    case 'SET_WANTED_COUNTRY':
      return { ...state, wantedCountry: action.payload };

    case 'CORRECT_GUESS':
      return {
        ...state,
        isCorrectGuess: true,
        gameStage: GameStage.RoundWon,
      };

    case 'UPDATE_POINTS':
      return {
        ...state,
        points: action.payload,
      };

    case 'NEW_ROUND':
      return {
        ...state,
        points: {
          totalPoints: state.points.totalPoints,
          roundPoints: 0,
          netRoundPoints: 0,
          usedClue: false,
        },
        selectedPosition: undefined,
        isCorrectGuess: false,
        wantedCountry: undefined,
        gameStage: GameStage.Countdown,
        roundNumber: state.roundNumber + 1,
      };

    default:
      return state;
  }
};
