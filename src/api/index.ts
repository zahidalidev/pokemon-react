import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonAPISlice = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: (offset) => `pokemon?offset=${offset}&limit=20`,
    }),
    getPokemonById: builder.query({
      query: (id) => `pokemon/${id}`,
    }),
  }),
})

export const { useGetPokemonsQuery, useGetPokemonByIdQuery } = pokemonAPISlice
