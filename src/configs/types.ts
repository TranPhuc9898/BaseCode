export interface IMessage {
  name?: string
  phone?: string
  email?: string
  message?: string
}

export interface IFullSlug {
  slug: string
  internalId: string
}

export type TOrder = 'DESC' | 'ASC'

export interface IBaseQuery {
  currentPage?: number
  pageSize?: number
  lastId?: number
  keyword?: string
  sortField?: string
  sortOrder?: TOrder
  canPaginated?: boolean
}
