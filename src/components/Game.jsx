import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  heal,
  gatherSupplies,
  openMysteryBox,
  ignoreMysteryBox,
  travel,
  searchRareItems,
  leaveTown,
} from '../redux/gameSlice';
import Store from './Store';

const Game = () => {
  const dispatch = useDispatch();
  const {
    supplies,
    distance,
    days,
    health,
    rareItems,
    message,
    gameOver,
    inTown,
    canProceed, // Destructure `canProceed` here
  } = useSelector((state) => state.game);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameOver) return;

      switch (event.key.toLowerCase()) {
        case 'g': // Gather supplies
          if (!inTown && canProceed) dispatch(gatherSupplies());
          break;
        case 't': // Travel
          if (!inTown && canProceed) dispatch(travel());
          break;
        case 'r': // Search for rare items
          if (!inTown && canProceed) dispatch(searchRareItems());
          break;
        case 'v': // Visit store
          if (inTown) return; // No action required for visiting the store in this version
          break;
        case 'y': // Open mystery box
          if (!gameOver) dispatch(openMysteryBox());
          break;
        case 'n': // Ignore mystery box
          if (!gameOver) dispatch(ignoreMysteryBox());
          break;
        case 'l': // Leave town
          if (inTown) dispatch(leaveTown());
          break;
        case 'h': // Heal
          if (!inTown && canProceed) dispatch(heal());
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch, gameOver, inTown, canProceed]); // Add `canProceed` to the dependency array

  const handleReset = () => {
    window.location.reload(); // Refreshes the page
  };

  if (gameOver) {
    return (
      <div className="game-container">
        <h1>Game Over</h1>
        <p>{message}</p>
        <p>Distance Traveled: {distance} miles</p>
        <p>Days Taken: {days}</p>
        <p>Supplies Remaining: {supplies}</p>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Wagon Trail Adventure</h1>
      <div className="status">
        <p>Supplies: {supplies}</p>
        <p>Distance: {distance} miles</p>
        <p>Days: {days}</p>
        <p>Health: {health}</p>
      </div>
      <p>{message}</p>
      {inTown && <Store />}
      <div className="inventory">
        <h2>Rare Items:</h2>
        <ul>
          {rareItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="instructions">
        <p>Key Bindings:</p>
        <ul>
          <li><b>G</b>: Gather Supplies</li>
          <li><b>T</b>: Travel</li>
          <li><b>R</b>: Search Rare Items</li>
          <li><b>H</b>: Heal</li>
        </ul>
      </div>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default Game;
