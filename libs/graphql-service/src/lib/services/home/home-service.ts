import * as Queries from './home-queries';
import { HomePage } from './home-models';
import BaseService from '../baseService';

export class HomePageService extends BaseService {
  get() {
    return this.query<{ homepage: HomePage }>(Queries.GET);
  }
}

export default HomePageService;
