import { combineReducers } from 'redux'

import authReducer from './authReducer'
import videoReducer from './videoReducer'

export const reducers = combineReducers({ authReducer, videoReducer })
