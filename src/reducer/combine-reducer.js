import {combineReducers} from 'redux';

import {dataReducer} from './data/data';
import {uiReducer} from './ui/ui';
import {userReducer} from './user/user';
import {reviewsReducer} from './reviews/reviews';
import {favoritesReducer} from './favorites/favorites';

export default combineReducers({
  data: dataReducer,
  ui: uiReducer,
  user: userReducer,
  reviews: reviewsReducer,
  favorites: favoritesReducer
});
