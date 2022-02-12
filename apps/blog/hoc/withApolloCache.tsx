import { ApolloService } from '@alamos-fe/graphql-service';
import { useEffect, useRef } from 'react';

export const withApolloCache = (WrappedComponent: React.ComponentType | React.ElementType) =>
  function CacheProvider({ [ApolloService.initialCacheState]: initialState, ...props }) {
    const willMount = useRef(true);
    if (willMount.current && initialState) ApolloService.restoreCache(initialState);
    useEffect(() => {
      willMount.current = false;
    }, []);
    return <WrappedComponent {...props} />;
  };

export default withApolloCache;
