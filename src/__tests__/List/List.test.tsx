import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Lists from 'pages/List'
import { PokemonData, PokemonsList } from '../../types'
import { useGetPokemonsQuery } from '../../api/index'

jest.mock('../../api/index')

describe('Lists Component Tests', () => {
  test('displays loading indicator during data fetching', async () => {
    const mockResponse: PokemonsList = {
      data: { results: [], count: 0 },
      error: false,
      isLoading: true,
    }

    ;(useGetPokemonsQuery as jest.Mock).mockReturnValue(mockResponse)

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('shows error message if data fetching encounters an error', async () => {
    const mockResponse: PokemonsList = {
      data: { results: [], count: 0 },
      error: true,
      isLoading: false,
    }

    ;(useGetPokemonsQuery as jest.Mock).mockReturnValue(mockResponse)

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    )

    expect(screen.getByText('Error...')).toBeInTheDocument()
  })

  test('displays list of Pokémon names', async () => {
    const mockPokemons: PokemonData[] = [
      { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
      { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
    ]

    const mockResponse: PokemonsList = {
      data: { results: mockPokemons, count: 2 },
      error: false,
      isLoading: false,
    }

    ;(useGetPokemonsQuery as jest.Mock).mockReturnValue(mockResponse)

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    )

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument()
    })
  })

  test('navigates to correct Pokémon page upon clicking a Pokémon name', async () => {
    const mockPokemons: PokemonData[] = [
      { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
      { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
    ]

    const mockResponse: PokemonsList = {
      data: { results: mockPokemons, count: 2 },
      error: false,
      isLoading: false,
    }

    ;(useGetPokemonsQuery as jest.Mock).mockReturnValue(mockResponse)

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Pikachu'))

    expect(window.location.href).toBe('http://localhost/')
  })
})
