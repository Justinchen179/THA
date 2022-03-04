import { combineReducers, createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import loginReducer from '../reducer/login'
import dharmReducer from '../reducer/dharm'
import albumReducer from '../reducer/album'

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore)

const rootReducer = combineReducers({
  loginReducer,
  dharmReducer,
  albumReducer
})

const store = createStoreWithMiddleware(rootReducer)

export default store
