import { combineReducers } from 'redux'

import competitionsReducer from './competitions'

const rootReducer = combineReducers({
  competitions: competitionsReducer,
})

export default rootReducer