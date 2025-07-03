import { GameState, transitions, type GameData } from '@/types/game';

export const canTransition = (from: GameState, to: GameState) => {
  return transitions[from].includes(to);
};

export const getTransitions = (gameData: GameData) => {
  return transitions[gameData.state];
};
