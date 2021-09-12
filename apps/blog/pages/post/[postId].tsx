import { ApolloService, Post } from "@alamos-fe/graphql-service";
import { useRouter } from "next/dist/client/router";
import Image from 'next/image'
import { useEffect } from "react";


/* eslint-disable-next-line */
export interface PostProps {
  post : Post
}

export const PostComponent: React.FC<PostProps> = ({ post }) =>  {
  const router = useRouter();
  const postId = router.query.postId;

  // useEffect(() => {
  //   ApolloService.post.get(3).then(({data})=>{
  //     console.log(data)
  //   })
  // })

  if(!post) return null;

    return (
      <>
        <div className="flex relative w-full h-64 sm:h-80 md:h-96"><Image src={post.image?.url} alt="thumbnail" layout="intrinsic" width={post.image?.width} height={post.image?.height} /></div>
        <div className="flex flex-col flex-grow p-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </>
    );
  }

export async function getStaticPaths() {
  const { data , loading, error }  = await ApolloService.post.getIds();
  const posts = data.articles;
  return {
    paths: posts.map(({id}) => ({ params: { postId: id } })),
    fallback: true,
  };
}
  
export async function getStaticProps({ params }){
  const { postId } = params;
  const { data , loading, error }  = await ApolloService.post.get(postId);
  
  return {
    props:{
      post : data.article
    }
  }
}
  
  export default PostComponent;
  