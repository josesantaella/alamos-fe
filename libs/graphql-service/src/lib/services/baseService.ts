import { ApolloQueryResult } from "@apollo/client";

class BaseService {
    constructor(protected query : <T>(query: string, variables?: any)=> Promise<ApolloQueryResult<T>>){}
}

export default BaseService