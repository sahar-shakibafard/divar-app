import api from "configs/api";

const getProfile = async () => {
  const response = await api.get("user/whoami").then(response => response || false);
  return response;
};

const getPosts = async () => {
  const response = await api.get("post/my");
  return response;
}

export { getProfile, getPosts };
