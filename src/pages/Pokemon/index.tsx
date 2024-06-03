import { PokemonQuery, Type } from 'types'
import { useParams } from 'react-router-dom'

import { useGetPokemonByIdQuery } from '../../api'

import './styles.css'

const Pokemon = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useGetPokemonByIdQuery<PokemonQuery>(id)

  if (isLoading) return <div className='message'>Loading...</div>

  if (isError)
    return <div className='message'>Error fetching Pokémon details.</div>

  return (
    <div className='pokemon-container'>
      <div className='pokemon-center'>
        <h2 className='pokemon-name'>{pokemon?.name}</h2>
        <div className='pokemon-image'>
          <img
            src={pokemon?.sprites.front_default}
            alt={pokemon?.name}
            className='pokemon-image'
          />
        </div>
        <div className='pokemon-details'>
          <p>
            <strong>Height:</strong> {pokemon?.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon?.weight}
          </p>
          <div className='pokemon-types'>
            {pokemon?.types.map(({ type }: Type, index) => (
              <span key={index} className='pokemon-type'>
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pokemon
