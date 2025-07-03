import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { gameData } from '@/store';
import { canTransition, getTransitions } from '@/lib/state';
import { transitions } from '@/types/game';
import { GameState } from '@/types/game';

export default function useGameState() {
  const [data, setGameData] = useAtom(gameData);

  const transition = useCallback(
    (to: GameState) => {
      if (canTransition(data.state, to)) {
        setGameData({ ...data, state: to });
      } else {
        console.error(`
                Illegal transition attempted!\n
                from ${data.state}
                to ${to}
            `);
      }
    },
    [data, setGameData]
  );

  const setScore = useCallback(
    (score: number) => {
      setGameData({ ...data, score });
    },
    [data, setGameData]
  );

  const transitionFunctions = useMemo(() => {
    const validTransitions = getTransitions(data);
    return Object.keys(GameState).reduce(
      (acc, key) => {
        return {
          ...acc,
          [key]:
            key in validTransitions
              ? () => transition(GameState[key as keyof typeof GameState])
              : () => {},
        };
      },
      {} as Record<GameState, () => void>
    );
  }, [data, transition]);

  return {
    data,
    setScore,
    ...transitionFunctions,
  };
}
