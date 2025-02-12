import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { getCategory } from "services/admin";
import { getCookie } from "utils/cookies";

import styles from "./AddPost.module.css";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    price: null,
    city: "",
    category: "",
    image: null,
  });

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "image") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      if (
        event.target.files[0].size <= 50000 &&
        event.target.files[0].type === "image/jpeg"
      ) {
        setForm({ ...form, [name]: event.target.files[0] });
      } else {
        alert(
          "حداکثر حجم فایل باید 50 کیلوبایت و پسوند فایل از نوع jpeg باشد."
        );
      }
    }
  };

  const addHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }

    const token = getCookie("accessToken");
    axios.post(`${import.meta.env.VITE_API_URL}post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${token}`,
      },
    }).then(response => console.log(response)).catch(error => console.log(error));

    console.log(form);
    // event.target.reset();
  };

  return (
    <>
      <form onChange={changeHandler} className={styles.form}>
        <h3>افزودن آگهی</h3>
        <label htmlFor="title">عنوان</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="content">توضیحات</label>
        <textarea name="content" id="content" />
        <label htmlFor="price">قیمت</label>
        <input type="number" name="price" id="price" />
        <label htmlFor="city">شهر</label>
        <input type="text" name="city" id="city" />
        <label htmlFor="category">دسته بندی</label>
        <select name="category" id="category">
          {data?.data.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <label htmlFor="image">عکس</label>
        <input type="file" name="image" id="image" />
        <button onClick={addHandler}>ایجاد</button>
      </form>
    </>
  );
};

export default AddPost;
