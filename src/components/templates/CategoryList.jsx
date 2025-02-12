import { useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "../modules/Loader";
import { getCategory, deleteCategory } from "services/admin";

import styles from "./CategoryList.module.css";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  queryClient.refetchQueries({ queryKey: ["get-categories"], type: "active" });

  return (
    <>
      <div className={styles.list}>
        {isPending ? (
          <Loader />
        ) : (
          data.data.map((category) => (
            <div key={category._id}>
              <img src={`${category.icon}.svg`} />
              <h5>{category.name}</h5>
              <button onClick={() => deleteCategory(category._id)}>
                حذف دسته بندی
              </button>
              <p>slug: {category.slug}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CategoryList;
