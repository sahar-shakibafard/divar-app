import api from "configs/api";

const addCategory = async (data) => {
  const response = await api.post("category", data);
  return response;
};

const getCategory = async () => {
  const response = await api.get("category");
  return response;
};

const deleteCategory = (id) => {
  api.delete(`category/${id}`);
};

export { addCategory, getCategory, deleteCategory };
