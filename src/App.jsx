import React from 'react';
import { useSelector } from 'react-redux';
import Story from './components/Story';
import Game from './components/Game';

const App = () => {
  const storyComplete = useSelector((state) => state.game.storyComplete);

  return <div>{storyComplete ? <Game /> : <Story />}</div>;
};

export default App;
