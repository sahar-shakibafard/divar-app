import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCategory } from "services/admin";

import styles from "./CategoryForm.module.css";

const CategoryForm = () => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: addCategory, 
    onSuccess: () => {
      queryClient.invalidateQueries("get-categories")
    }
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);

    event.target.reset();
  };

  return (
    <>
      <form
        onChange={changeHandler}
        onSubmit={submitHandler}
        className={styles.form}
      >
        <h3>دسته بندی جدید</h3>
        {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد.</p>}
        <label htmlFor="name">اسم دسته بندی</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="slug">اسلاگ</label>
        <input type="text" name="slug" id="slug" />
        <label htmlFor="icon">آیکون</label>
        <input type="text" name="icon" id="icon" />
        <button type="submit" disabled={isPending}>ایجاد</button>
      </form>
    </>
  );
};

export default CategoryForm;
