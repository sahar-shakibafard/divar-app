import { useQuery } from "@tanstack/react-query";

import { getPosts } from "services/user";
import Loader from "../modules/Loader";

const PostsList = () => {
  const baseURL = import.meta.env.VITE_API_URL;

  const { data, isPending } = useQuery({
    queryKey: ["get-posts-list"],
    queryFn: getPosts,
  });
  console.log({ data, isPending });

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id}>
              <img src={`${baseURL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div>
                <p>{post.createdAt}</p>
                <span>{post.amount} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PostsList;
