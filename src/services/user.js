import api from "configs/api";

const getProfile = async () => {
  const response = await api.get("user/whoami").then(response => response || false);
  return response;
};

export { getProfile };
