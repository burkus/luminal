import { useControls } from 'leva'
import { GameState } from '@/types/game'
import useGameState from '@/hooks/useGameState'
import { gameData } from '@/store'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { styled } from 'styled-components'

const Code = styled.code`
  font-size: 12px;
  font-family: monospace;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  gap: 20px;
`

function App() {
  const { state } = useControls({
    state: {
      value: GameState.Loading,
      options: Object.values(GameState)
    }
  })
  const setGameData = useSetAtom(gameData)
  const game = useGameState()

  useEffect(() => {
    setGameData(prev => ({
      ...prev,
      state: state as GameState
    }))
  }, [state, setGameData])

  return (
    <Container>
      <div>
        current state: {game.data.state}
      </div>
      <Code>
        {JSON.stringify(game.data, null, 2)}
      </Code>
      <div>
        {Object.entries(game)
          .filter(([key]) => key in GameState)
          .map(([key, value]) => (
            <div>{key}: {typeof value}</div>
        ))}
      </div>
    </Container>
  )
}

export default App
