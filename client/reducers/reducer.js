import { combineReducers } from 'redux';

const reducer = combineReducers({
  add: (state = 0, action) => {
    switch (action.type) {
      case 'one':
        return [action.payload];
    }
    return state;
  }
});

module.exports = {
  reducer,
};