import * as Queries from './home-queries';
import { HomePage } from './home-models';
import BaseService from '../baseService';
export class HomePageService extends BaseService {
  queries = {
    GET: Queries.GET
  };

  get() {
    return this.runQuery<{ homepage: HomePage }>(this.queries.GET);
  }
}

export default HomePageService;
