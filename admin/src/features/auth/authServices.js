import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-all-orders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getOrderByUser/${id}`,
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
