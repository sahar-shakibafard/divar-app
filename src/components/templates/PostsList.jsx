import { useQuery } from "@tanstack/react-query";

import { getPosts } from "services/user";
import Loader from "../modules/Loader";
import { sp } from "utils/number";

import styles from "./PostsList.module.css";

const PostsList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["get-posts-list"],
    queryFn: getPosts,
  });
  console.log({ data, isPending });

  return (
    <>
      <div className={styles.list}>
        {isPending ? (
          <Loader />
        ) : (
          <>
            <h3>آگهی های شما</h3>
            {data?.data.posts.map((post) => (
              <div key={post._id} className={styles.post}>
                <img
                  src={`${import.meta.env.VITE_API_URL}${post.images[0]}`}
                />
                <div>
                  <p>{post.options?.title}</p>
                  <span>{post.options?.content}</span>
                </div>
                <div className={styles.price}>
                  <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                  <span>{sp(post.amount)} تومان</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PostsList;
