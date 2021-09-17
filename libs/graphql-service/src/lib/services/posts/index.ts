import * as Queries from './queries';
import { Post } from './models';
import BaseService from '../baseService';
class PostService extends BaseService {
  getAll() {
    return this.query<{ articles: Post[] }>(Queries.GET_ALL);
  }
  getBySlug(slug: string) {
    return this.query<{ articles: Post[] }>(Queries.GET_BY_SLUG, { slug });
  }
  getSlugs() {
    return this.query<{ articles: { slug: string }[] }>(Queries.GET_ALL_SLUG);
  }
}

export default PostService;
