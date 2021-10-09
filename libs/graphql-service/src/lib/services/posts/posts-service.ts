import * as Queries from './posts-queries';
import { Post } from './posts-models';
import BaseService from '../baseService';

export class PostService extends BaseService {
  getAll() {
    return this.query<{ articles: Post[] }>(Queries.GET_ALL);
  }
  getBySlug(slug: string) {
    return this.query<{ articles: Post[] }>(Queries.GET_BY_SLUG, { slug });
  }
  getSlugs() {
    return this.query<{ articles: Post[] }>(Queries.GET_ALL_SLUG);
  }
}

export default PostService;
