import * as Queries from './queries'
import { Post } from './models'
import BaseService from '../baseService'
class PostService extends BaseService {
  getAll() {
    return this.query<{ articles: Post[] }>(Queries.GET_ALL)
  }
  get(id: number) {
    return this.query<{ articles: Post[] }>(Queries.GET, { id })
  }
  getIds() {
    return this.query<{ articles: { id: number }[] }>(Queries.GET_ALL_ID)
  }
}

export default PostService
