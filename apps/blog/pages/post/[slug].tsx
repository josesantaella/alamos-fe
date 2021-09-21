import { ApolloService, Post } from '@alamos-fe/graphql-service';
import { blurHashToBase64 } from '@alamos-fe/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config.js';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface PostProps {
  post: Post;
}

export const PostComponent: React.FC<PostProps> & { isLocaleHandler: boolean } = ({ post: InitialData }) => {
  const router = useRouter();
  const { locale, query, isReady } = router;
  const slug = query.slug?.toString();
  const [post, setPost] = useState<Post>(InitialData);

  useEffect(() => {
    setPost(InitialData);
  }, [InitialData]);

  useEffect(() => {
    if (!isReady || post) return;
    ApolloService.post.getBySlug(slug).then(({ data }) => {
      setPost(data.articles[0]);
    });
  }, [isReady, post, slug]);

  useEffect(() => {
    const localization = post?.localizations.find((x) => x.locale == locale);
    if (!post || post.locale == locale) return;
    if (localization?.slug) {
      router.replace(
        {
          pathname: '/post/[slug]',
          query: { slug: localization.slug }
        },
        undefined,
        { locale: localization.locale }
      );
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, locale]);

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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params;
  ApolloService.setLocale(locale);
  const { data, loading, error } = await ApolloService.post.getBySlug(slug.toString());

  return {
    props: {
      post: data.articles[0],
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig))
    }
  };
};

PostComponent.isLocaleHandler = true;
export default PostComponent;
