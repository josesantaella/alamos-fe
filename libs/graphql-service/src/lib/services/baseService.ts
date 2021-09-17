import { ApolloQueryResult } from '@apollo/client';

class BaseService {
  constructor(
    protected query: <T>(query: string, variables?: Record<string, string | number>) => Promise<ApolloQueryResult<T>>
  ) {}
}

export default BaseService;
