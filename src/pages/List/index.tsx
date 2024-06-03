import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactTable } from '../../components'
import { ColumnDefinition, PokemonsList } from 'types'
import { useGetPokemonsQuery } from '../../api/index'

import './styles.css'

const Lists = () => {
  const [page, setPage] = useState(0)
  const navigate = useNavigate()


  const {
    data: pokemonList,
    error,
    isLoading,
  } = useGetPokemonsQuery<PokemonsList>(page)

  const handleRedirection = (url: String) => {
    const id = url.split('/').splice(-2, 1)
    navigate(`/pokemon/${id}`)
  }

  const columns: ColumnDefinition[] = [
    {
      accessorKey: 'name',
      Header: 'Name',
      cell: (info: any) => (
        <div className='poke' onClick={() => handleRedirection(info.cell.row.original.url)}>
          {info.getValue()}{' '}
        </div>
      ),
      footer: (props) => props.column.id,
    },
  ]

  const fetchData = (index: number) => {
    setPage(index * 20)
  }

  if (isLoading) return <div className='message'>Loading...</div>
  if (error) return <div className='message'>Error...</div>

  return (
    <div className='poke-container'>
      <div className='heading'>Pokemon</div>

      <ReactTable
        data={pokemonList?.results || []}
        columns={columns}
        count={pokemonList?.count || 0}
        fetchData={fetchData}
        page={page}
      />
    </div>
  )
}

export default Lists
