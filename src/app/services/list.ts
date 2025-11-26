import {Injectable} from '@angular/core';

export interface QueryParams {
  WithDeleted: string
  Search: string
  Ids: number[]
  SortColumn: string
  SortOrder: string
  PaginationLimit: number
  PaginationOffset: number
}

@Injectable({
  providedIn: 'root'
})

export class ListService {
  buildQuery(url: URL, qp: QueryParams) {
    if (qp.WithDeleted) {
      url.searchParams.set("deleted", qp.WithDeleted)
    }

    if (qp.Search) {
      url.searchParams.set("search", qp.Search)
    }

    if (qp.Ids.length > 0) {
      qp.Ids.forEach((id: number) => {
        url.searchParams.set("ids", id.toString())
      })
    }

    if (qp.SortColumn) {
      url.searchParams.set("sort_by", qp.SortColumn)
    }

    if (qp.SortOrder) {
      url.searchParams.set("order", qp.SortOrder)
    }

    if (qp.PaginationLimit) {
      url.searchParams.set("limit", qp.PaginationLimit.toString())
    }

    if (qp.PaginationOffset) {
      url.searchParams.set("offset", qp.PaginationOffset.toString())
    }

    return url
  }
}
