import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Table } from 'types'

const ReactTable = ({ data, columns, count, fetchData }: Table) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const table = useReactTable({
    columns,
    data,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    manualPagination: true,
    rowCount: count,
    state: {
      pagination,
    },
  })

  useEffect(() => {
    fetchData(pagination.pageIndex)
  }, [fetchData, pagination.pageIndex])

  return (
    <div className='p-2'>
      <div className='h-2' />
      <table className='poke-table'>
        <tbody className='poke-table-body'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className='h-2' />

      <div className='pagination-container'>
        <section className='pagination-btns'>
          <button
            className='pagination-button'
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className='pagination-button'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className='pagination-button'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className='pagination-button'
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </section>
        <section className='pagination-input-container'>
          <span className='pagination-info pagination-text'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </span>
        </section>
      </div>
    </div>
  )
}

export default ReactTable
