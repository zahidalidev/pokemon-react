import { render, screen } from '@testing-library/react'
import Pokemon from 'pages/Pokemon'
import { PokemonQuery, PokemonType } from '../../types'
import { useGetPokemonByIdQuery } from '../../api/index'

jest.mock('../../api/index')

describe('Pokemon Component Tests', () => {
  test('displays loading indicator while data is being fetched', async () => {
    const mockResponse: PokemonQuery = {
      data: undefined,
      isLoading: true,
      isError: false,
    }

    ;(useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockResponse)

    render(<Pokemon />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('shows error message when data fetch fails', async () => {
    const errorText = 'Error fetching Pokémon details.'

    const mockResponse: PokemonQuery = {
      data: undefined,
      isLoading: false,
      isError: true,
    }

    ;(useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockResponse)

    render(<Pokemon />)

    expect(screen.getByText(errorText)).toBeInTheDocument()
  })

  test('renders Pokémon details when data fetch is successful', async () => {
    const mockPokemon: PokemonType = {
      name: 'Pikachu',
      weight: '10',
      height: '5',
      types: [{ type: { name: 'Electric' } }],
      sprites: { front_default: 'some/image/url' },
    }

    const mockResponse: PokemonQuery = {
      data: mockPokemon,
      isLoading: false,
      isError: false,
    }

    ;(useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockResponse)

    render(<Pokemon />)

    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByAltText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Electric')).toBeInTheDocument()
  })
})
