
import { styled } from 'styled-components';
import GameScene from '@/GameScene';

const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

function App() {

  return (
    <FullScreenContainer>
      <GameScene />
    </FullScreenContainer>
  );
}

export default App;
