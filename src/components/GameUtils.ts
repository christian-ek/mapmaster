import { ROUND_POINTS, CLUE_PENALTY } from '../constants/constants';
import { Country } from '../interfaces/Country';
import { GameStage, GameMode } from '../interfaces/GameState';

/*
 * Function used to calculate the points for the current round.
 */
export const calculatePoints = (usedClue: boolean) => {
  const roundPoints = ROUND_POINTS;
  const netRoundPoints = usedClue ? roundPoints - CLUE_PENALTY : roundPoints;
  return { roundPoints, netRoundPoints };
};

/*
 * Function used to check if the selected country is the wanted country.
 */
export const isCorrectGuess = (
  selectedCountry: Country,
  wantedCountry: Country | undefined,
  gameStage: GameStage
) => {
  return (
    gameStage === GameStage.Running &&
    wantedCountry &&
    selectedCountry?.name.common === wantedCountry.name.common
  );
};

/*
 * Function used to get the name of the game mode in a readable format.
 */
export const getGameModeName = (gameMode: GameMode): string => {
  return gameMode.replace(/([A-Z])/g, ' $1').trim();
};
