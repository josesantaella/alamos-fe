import { ApolloService } from '@alamos-fe/graphql-service';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export const withApolloStaticProps = (fn: (props: GetStaticPropsContext) => Promise<{ props }>) => {
  const getStaticPropsFn: GetStaticProps = async (ctx) => {
    const { locale } = ctx;
    ApolloService.setLocale(locale);
    const { props } = await fn(ctx);
    return {
      props: {
        [ApolloService.initialCacheState]: ApolloService.extractCache(),
        ...props
      }
    };
  };

  return getStaticPropsFn;
};

export default withApolloStaticProps;
