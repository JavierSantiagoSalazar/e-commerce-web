export interface JsonApiLinks {
  self: string;
  first: string;
  last: string;
  prev?: string;
  next?: string;
}

export interface JsonApiMeta {
  totalPages: number;
  pageSize: number;
  currentPage: number;
  totalElements: number;
}

export interface JsonApiResponse<T> {
  data: T;
  links: JsonApiLinks;
  meta: JsonApiMeta;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
