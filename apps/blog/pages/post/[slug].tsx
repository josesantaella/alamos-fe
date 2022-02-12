import { useQuery } from '@apollo/client';
import { ApolloService, Post } from '@alamos-fe/graphql-service';
import { blurHashToBase64 } from '@alamos-fe/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';

import nextI18NextConfig from '../../next-i18next.config.js';
import withApolloStaticProps from '../../hoc/withApolloStaticProps';
import withApolloCache from '../../hoc/withApolloCache';

/* eslint-disable-next-line */
export const PostComponent: React.FC = () => {
  const { locale, query } = useRouter();
  const slug = query.slug?.toString();
  const queryOptions = { variables: { locale, slug }, skip: !slug };
  const { data: postData } = useQuery<{ articles: Post[] }>(ApolloService.post.queries.GET_BY_SLUG, queryOptions);
  const post = postData && postData.articles[0];

  if (!post) return null;

  return (
    <>
      <div className="flex relative w-full h-64 sm:h-80 md:h-96">
        <Image
          src={post.image?.url}
          alt="thumbnail"
          layout="intrinsic"
          width={post.image?.width}
          height={post.image?.height}
          placeholder={'blur'}
          blurDataURL={blurHashToBase64(post.image?.blurHash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj')}
        />
      </div>
      <div className="flex flex-col flex-grow p-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <br />
        <p>{post.description}</p>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, loading, error } = await ApolloService.post.getSlugs();
  const posts = data.articles;
  const paths = posts.reduce((acc, { slug, locale, localizations }) => {
    acc.push({ params: { slug }, locale });
    return acc.concat(localizations.map(({ slug, locale }) => ({ params: { slug }, locale })));
  }, []);
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = withApolloStaticProps(async ({ params, locale }) => {
  const { slug } = params;
  await ApolloService.post.getBySlug(slug.toString());
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig))
    }
  };
});

export default withApolloCache(PostComponent);
