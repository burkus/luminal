import { atom } from 'jotai';
import { type GameData, GameState } from '@/types/game';

export const gameData = atom<GameData>({
  state: GameState.Loading,
  score: 0,
});
