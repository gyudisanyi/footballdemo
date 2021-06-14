import { combineReducers } from 'redux'

import competitionsReducer from './competitions'

import matchesReducer from './matches'

const rootReducer = combineReducers({
  competitions: competitionsReducer,
  matches: matchesReducer,
})

export default rootReducer