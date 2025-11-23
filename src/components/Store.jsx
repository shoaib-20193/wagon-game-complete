import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sellItem } from '../redux/gameSlice';

const Store = () => {
  const dispatch = useDispatch();
  const { rareItems } = useSelector((state) => state.game);

  return (
    <div className="store-container">
      <h2>Welcome to the Store</h2>
      <p>Sell your rare items for supplies.</p>
      <ul>
        {rareItems.map((item, index) => (
          <li key={index}>
            {item}{' '}
            <button onClick={() => dispatch(sellItem(item))}>Sell</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Store;
