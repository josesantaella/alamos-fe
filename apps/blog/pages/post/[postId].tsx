import { useRouter } from "next/dist/client/router";


/* eslint-disable-next-line */
export interface PostProps {
}

export const Post: React.FC<PostProps> = (props) =>  {
  const router = useRouter();
  const postId = router.query.postId;

    return (
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Post Page - {postId}
          </h2>
        </div>
      </div>
    );
  }
  
  export default Post;
  