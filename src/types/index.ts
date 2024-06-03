export interface PokemonData {
  name: string
  url: string
}

export interface ColumnDefinition {
  accessorKey: string
  Header: string
  cell: (info: any) => JSX.Element
  footer: (props: any) => string
}

export interface PaginationState {
  pagination: {
    currentPage: number
  }
}

export interface PokemonResultData {
  results: PokemonData[]
  count: number
}

export interface PokemonsList {
  data: PokemonResultData
  error: boolean
  isLoading: boolean
}

export interface Type {
  type: {
    name: string
  }
}

export interface PokemonType {
  name: string
  weight: string
  types: Type[]
  height: string
  sprites: {
    front_default: string
  }
}

export interface PokemonQuery {
  data: PokemonType | undefined
  isError: boolean
  isLoading: boolean
}

export interface Table {
  data: any
  columns: ColumnDefinition[]
  count: number
  fetchData: (index: number) => void
  page: any
}
