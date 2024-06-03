import { render, screen } from '@testing-library/react'

import ReactTable from 'components/Table'
import { ColumnDefinition } from '../../types'

const columns: ColumnDefinition[] = [
  {
    accessorKey: 'name',
    Header: 'Name',
    cell: (info: any) => {
      return <div className='poke'>{info.getValue()}</div>
    },
    footer: (props) => props.column.id,
  },
]

const data = [
  { id: 1, name: 'Pikachu', url: 'some/url' },
  { id: 2, name: 'Bulbasaur', url: 'some/other/url' },
]

describe('ReactTable Component Tests', () => {
  test('displays table with the given data', () => {
    const totalItems = 2
    const loadTableData = jest.fn()
    const currentPage = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={totalItems}
        fetchData={loadTableData}
        page={currentPage}
      />
    )

    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
  })

  test('invokes fetchData function when table is initialized', () => {
    const totalItems = 2
    const loadTableData = jest.fn()
    const currentPage = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={totalItems}
        fetchData={loadTableData}
        page={currentPage}
      />
    )

    expect(loadTableData).toHaveBeenCalledWith(currentPage)
  })

  test('renders pagination controls correctly', () => {
    const totalItems = 2
    const loadTableData = jest.fn()
    const currentPage = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={totalItems}
        fetchData={loadTableData}
        page={currentPage}
      />
    )

    expect(screen.getByText('<<')).toBeInTheDocument()
    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('>>')).toBeInTheDocument()
  })

  test('pagination buttons are disabled appropriately based on page count', () => {
    const totalItems = 2
    const loadTableData = jest.fn()
    const currentPage = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={totalItems}
        fetchData={loadTableData}
        page={currentPage}
      />
    )

    expect(screen.getByText('<')).toBeDisabled()
    expect(screen.getByText('<<')).toBeDisabled()
  })
})
