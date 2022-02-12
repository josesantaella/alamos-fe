import { ApolloQueryResult, DocumentNode } from '@apollo/client';
class BaseService {
  queries: Record<string, DocumentNode>;
  constructor(
    protected runQuery: <T>(
      query: DocumentNode,
      variables?: Record<string, string | number>
    ) => Promise<ApolloQueryResult<T>>
  ) {}
}

export default BaseService;
