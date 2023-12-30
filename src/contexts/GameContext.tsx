import React, { createContext, useReducer, useMemo } from 'react';
import { GameReducer, GameAction } from '../reducers/GameReducer';
import { initialState } from '../constants/InitialGameState';
import { GameState } from '../interfaces/GameState';

export interface GameContextType extends GameState {
  dispatch: React.Dispatch<GameAction>;
}

/**
 * Used for managing the game state.
 */
export const GameContext = createContext<GameContextType>({
  ...initialState,
  dispatch: () => {},
});

/**
 * Used for providing the game state and dispatch function to the components.
 */
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, dispatch] = useReducer(GameReducer, initialState);

  const contextValue = useMemo(
    () => ({
      ...gameState,
      dispatch,
    }),
    [gameState]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
