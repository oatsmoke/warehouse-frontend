import {Injectable} from '@angular/core';

export interface QueryParams {
  with_deleted: string
  search: string
  ids: number[]
  sort_column: string
  sort_order: string
  pagination_limit: number
  pagination_offset: number
  param: string
  param_id: number
}

@Injectable({
  providedIn: 'root'
})

export class ListService {
  buildQuery(url: URL, qp: QueryParams) {
    if (qp.with_deleted) {
      url.searchParams.set("deleted", qp.with_deleted);
    }

    if (qp.search) {
      url.searchParams.set("search", qp.search)
    }

    if (qp.ids.length > 0) {
      qp.ids.forEach((id: number) => {
        url.searchParams.set("ids", id.toString())
      })
    }

    if (qp.sort_column) {
      url.searchParams.set("sort_by", qp.sort_column)
    }

    if (qp.sort_order) {
      url.searchParams.set("order", qp.sort_order)
    }

    if (qp.pagination_limit) {
      url.searchParams.set("limit", qp.pagination_limit.toString())
    }

    if (qp.pagination_offset) {
      url.searchParams.set("offset", qp.pagination_offset.toString())
    }

    if (qp.param) {
      url.searchParams.set("param", qp.param)
    }

    if (qp.param_id) {
      url.searchParams.set("param_id", qp.param_id.toString())
    }

    return url
  }
}
