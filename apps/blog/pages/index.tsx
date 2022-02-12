import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { Modal } from '../models/modals';
import { ApolloService, HomePage, Post } from '@alamos-fe/graphql-service';
import { PostPreview } from '@alamos-fe/material-ui-core';
import { useRouter } from 'next/dist/client/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';

import Page from '../components/page';
import withApolloStaticProps from '../hoc/withApolloStaticProps';
import withApolloCache from '../hoc/withApolloCache';

const Index: React.FC = () => {
  const { push, locale } = useRouter();
  const queryOptions = { variables: { locale } };
  const { data: HomePageData } = useQuery<{ homepage: HomePage }>(ApolloService.home.queries.GET, queryOptions);
  const { data: PostData } = useQuery<{ articles: Post[] }>(ApolloService.post.queries.GET_ALL, queryOptions);
  return (
    <Page title={HomePageData?.homepage?.seo?.metaTitle}>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-indigo-600">{HomePageData?.homepage?.hero?.title}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href={`/?postId=1&modal=${Modal.post_view}`} as={`/post/1`}>
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-700">
                  Get started
                </a>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-primary-50"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap px-4 gap-4 justify-center sm:items-center">
          {PostData?.articles?.map((post) => (
            <PostPreview
              onReadMore={() =>
                push(`/?slug=${post.slug}&modal=${Modal.post_view}`, `/post/${post.slug}/`, { shallow: true })
              }
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.description}
              imageUrl={post.image.url}
            />
          ))}
        </div>
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = withApolloStaticProps(async ({ locale }) => {
  await ApolloService.post.getAll();
  await ApolloService.home.get();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig))
    }
  };
});

export default withApolloCache(Index);
