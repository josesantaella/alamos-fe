import { ApolloQueryResult } from "@apollo/client";

class BaseService {
    constructor(protected query : <T>(query: string)=> Promise<ApolloQueryResult<T>>){}
}

export default BaseService