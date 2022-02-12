import * as Queries from './posts-queries';
import { Post } from './posts-models';
import BaseService from '../baseService';

export class PostService extends BaseService {
  queries = {
    GET_ALL: Queries.GET_ALL,
    GET_BY_SLUG: Queries.GET_BY_SLUG,
    GET_ALL_SLUG: Queries.GET_ALL_SLUG
  };
  getAll() {
    return this.runQuery<{ articles: Post[] }>(this.queries.GET_ALL);
  }
  getBySlug(slug: string) {
    return this.runQuery<{ articles: Post[] }>(this.queries.GET_BY_SLUG, { slug });
  }
  getSlugs() {
    return this.runQuery<{ articles: Post[] }>(this.queries.GET_ALL_SLUG);
  }
}

export default PostService;
