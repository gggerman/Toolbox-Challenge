import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import filesReducer from './apis/files/filesSlice'
import filesQuery, {
  middleware as filesMiddleware,
} from './apis/files/filesQuery'

const combinedReducers = combineReducers({
  files: filesReducer,
  filesQuery,
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }
  return combinedReducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
        filesMiddleware,
    ),
  devTools: false,
  // preloadedState,
  // enhancers: [reduxBatch],
})

setupListeners(store.dispatch)
