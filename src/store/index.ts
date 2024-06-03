import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { pokemonAPISlice } from '../api'

export const store = configureStore({
  reducer: {
    pokemon: pokemonAPISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPISlice.middleware),
})

setupListeners(store.dispatch)
