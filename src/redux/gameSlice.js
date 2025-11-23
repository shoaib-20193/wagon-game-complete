import { createSlice } from '@reduxjs/toolkit';

const generateUniqueName = () => {
  const adjectives = ['Ancient', 'Mysterious', 'Shiny', 'Golden', 'Enchanted'];
  const nouns = ['Amulet', 'Sword', 'Gem', 'Scroll', 'Artifact'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

const initialState = {
  supplies: 100,
  distance: 0,
  days: 0,
  health: 100,
  rareItems: [],
  inventory: [],
  gameOver: false,
  storyComplete: false,
  message: '',
  inTown: false,
  isMysteryBoxEncountered: false,
  canProceed: true,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    heal(state) {
      if (state.supplies < 10) {
        state.message = 'You do not have enough supplies to heal yourself.';
        return;
      }
      else {
      state.health += 20;
      state.supplies -= 10;
      state.message = 'You healed yourself! +20 health.';}
    },
    gatherSupplies(state) {
    if(state.distance < 500){
      if (Math.random() > 0.8) {
        state.health -= 20;
        state.message = 'You were attacked by wild animals! -20 health.';
      } else {
        state.supplies += 15;
        state.message = 'You successfully gathered supplies! +15 supplies.';
      }
      state.days++;
      if (state.supplies <= 0 || state.health <= 0) {
        state.gameOver = true;
      }}
    else if(state.distance >= 500 && state.distance < 2000){
        if (Math.random() > 0.7) {
            state.health -= 25;
            state.message = 'You were attacked by wild animals! -25 health.';
          } else {
            state.supplies += 20;
            state.message = 'You successfully gathered supplies! +20 supplies.';
          }
          state.days++;
          if (state.supplies <= 0 || state.health <= 0) {
            state.gameOver = true;
          }       
        
      }
    },
    travel(state) {
      if(state.distance === 510){
            state.message += 'gathering resources will now be difficult!';
            state.supplies -= 20;
            state.distance += 10;
            state.days++;
        }
      else if (state.supplies >= 20) {
        state.supplies -= 20;
        state.distance += 10;
        state.days++;
        state.message = 'You traveled 10 miles.';
          if(Math.random() < 0.1){
            state.message += ' you encountered a mystery box! Press "y" to open it and "N" to ignore it.';
            state.isMysteryBoxEncountered = true;
            state.canProceed = false;
          }
        if (state.distance % 100 === 0) {
          state.inTown = true;
          state.message += ' You reached a town!';
        }
        if (state.distance >= 2000) {
          state.gameOver = true;
          state.message = 'Congratulations! You reached the city.';
        }
      } else {
        state.message = 'Not enough supplies to travel!';
      }
    },
    openMysteryBox(state) {
      if (!state.isMysteryBoxEncountered) return;
      if (Math.random() > 0.5) {
        state.message = 'You found supplies! +25 supplies.';
        state.supplies += 25;
      } else {
        state.message = 'A snake attacked you! -25 health.';
        state.health -= 25;
        if (state.health <= 0) {
          state.gameOver = true;
        }
      }
      state.canProceed = true;
      state.isMysteryBoxEncountered = false; // Reset the state
    },
    ignoreMysteryBox(state) {
      if (!state.isMysteryBoxEncountered) return;
      state.message = 'You ignored the mystery box.';
      state.isMysteryBoxEncountered = false; // Reset the state
      state.canProceed = true;
    },
    searchRareItems(state) {
      if (state.rareItems.length >= 12) {
        state.message = 'Inventory Full!.';
      } 
      else if (Math.random() > 0.7) {
        state.health -= 20;
        state.message = 'You were attacked by wild animals! -20 health.';
        state.days++;
      }
      else {
        const rareItem = generateUniqueName();
         state.rareItems.push(rareItem);
        state.message = `You found a rare item: ${rareItem}`;
        state.days++;
      }
      
      if (state.health <= 0) {
        state.gameOver = true;
      }
    },
    sellItem(state, action) {
      const itemIndex = state.rareItems.indexOf(action.payload);
      if (itemIndex > -1) {
        state.rareItems.splice(itemIndex, 1);
        const itemPrice = Math.floor(Math.random() * 60);
        state.supplies += itemPrice; // Sell price
        state.message = `You sold ${action.payload} for ${itemPrice} supplies! press L to leave town!`;
      }
    },
    leaveTown(state) {
      state.inTown = false;
    },
    completeStory(state) {
      state.storyComplete = true;
    },
    resetGame() {
      return initialState;
    },
  },
});

export const {
  heal,
  gatherSupplies,
  travel,
  openMysteryBox,
  ignoreMysteryBox,
  canProceed,
  searchRareItems,
  sellItem,
  leaveTown,
  completeStory,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
