import Game from './components/Game';
import { NotificationProvider } from './contexts/NotificationContext';
import { GameProvider } from './contexts/GameContext';

const App = () => {
  return (
    <GameProvider>
      <NotificationProvider>
        <Game />
      </NotificationProvider>
    </GameProvider>
  );
};

export default App;
