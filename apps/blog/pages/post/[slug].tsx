import { ApolloService, Post } from '@alamos-fe/graphql-service';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface PostProps {
  post: Post;
}

export const PostComponent: React.FC<PostProps> = ({ post: InitialData }) => {
  const router = useRouter();
  const { locale, query, isReady } = router;
  const slug = query.slug?.toString();
  const [post, setPost] = useState(InitialData);

  useEffect(() => {
    if (!isReady || post) return;
    ApolloService.post.getBySlug(slug).then(({ data }) => {
      setPost(data.articles[0]);
    });
  }, [isReady, post, slug]);

  useEffect(() => {
    const localization = post?.localizations.find((x) => x.locale == locale);
    if (post?.locale == locale || (post && !localization) || !localization) return;
    ApolloService.post.getBySlug(localization?.slug).then(({ data }) => {
      setPost(data.articles[0]);
    });
  }, [post, locale]);

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
        { shallow: true }
      );
    } else {
      router.push('/');
    }
  }, [post, locale, router]);

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
      post: data.articles[0]
    }
  };
};

export default PostComponent;
