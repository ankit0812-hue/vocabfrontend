import { createStore,combineReducers,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { WordReducer } from './reducers/WordReducer';

const reducers = combineReducers({words: WordReducer});
const store = createStore(reducers,applyMiddleware(ReduxThunk));
export default store;