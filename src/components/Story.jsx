import React from 'react';
import { useDispatch } from 'react-redux';
import { completeStory } from '../redux/gameSlice';
import styles from '../styles/App.css';

const Story = () => {
  const dispatch = useDispatch();

  return (
    <div className="story-container">
      <h1>Welcome to Wagon Trail</h1>
      <p className='story'>
        You are a brave traveler trying to reach the great city 2000 miles away.
        Along the way, you will face challenges, encounter towns, and gather
        supplies. Will you survive and make it to the end? Let the adventure
        begin!
      </p>
      <button onClick={() => dispatch(completeStory())}>Start Game</button>
    </div>
  );
};

export default Story;
