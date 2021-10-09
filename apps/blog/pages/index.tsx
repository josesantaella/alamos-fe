import Link from 'next/link';
import { Modal } from '../models/modals';
import { ApolloService, HomePage, Post } from '@alamos-fe/graphql-service';
import { PostPreview } from '@alamos-fe/material-ui-core';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';
import { useTranslation } from 'next-i18next';
import Page from '../components/page';

/* eslint-disable-next-line */
export interface PostProps {
  posts: Post[];
  homePage: HomePage;
}

const Index: React.FC<PostProps> = ({ posts: postsInitialData, homePage: homePageInitialData }) => {
  const router = useRouter();
  const { locale, isReady } = router;
  const [posts, setPosts] = useState<Post[]>(postsInitialData);
  const [homePage, setHomePage] = useState<HomePage>(homePageInitialData);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isReady) return;
    ApolloService.post.getAll().then(({ data }) => {
      setPosts(data.articles);
    });
  }, [locale, isReady]);
  console.log(homePage);
  return (
    <Page title={homePage?.seo?.metaTitle}>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-indigo-600">{homePage?.hero?.title}</span>
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
          {posts?.map((post) => (
            <PostPreview
              onReadMore={() => router.push(`/?slug=${post.slug}&modal=${Modal.post_view}`, `/post/${post.slug}/`)}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  ApolloService.setLocale(locale);
  const { data: posts } = await ApolloService.post.getAll();
  const {
    data: { homepage }
  } = await ApolloService.home.get();

  return {
    props: {
      homePage: homepage,
      posts: posts.articles,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig))
    }
  };
};

export default Index;
