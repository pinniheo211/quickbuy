import axios from "axios";
export const NEXT_BASE_URL = "https://nowmarket.largeswap.com/";
export const API = axios.create({ baseURL: NEXT_BASE_URL });
API.interceptors.request.use((req) => {
  // const token = getToken();
  // if (token) {
  // req.headers.Authorization = `Bearer ${token}`;
  // }
  return req;
});

// category
export const CategoryService = {
  getAllCategory: () => API.get("/api/v1/user/search/list"),
};

// product
export const ProductService = {
  getFeatureCategory: (data) =>
    API.get(
      `/api/v1/user/product/outstanding?page=${data.page}&limit=${data.limit}`
    ),
  getDailyBestSell: (data) =>
    API.get(
      `/api/v1/user/product/bestsell?page=${data.page}&limit=${data.limit}`
    ),
  getDealOfTheDay: (data) =>
    API.get(
      `/api/v1/user/product/bestOfDay?page=${data.page}&limit=${data.limit}`
    ),
  getTopSell: (data) =>
    API.get(
      `/api/v1/user/product/topsell?page=${data.page}&limit=${data.limit}`
    ),
  getTopRating: (data) =>
    API.get(
      `/api/v1/user/product/topRating?page=${data.page}&limit=${data.limit}`
    ),
  getAllProduct: () => API.get("/api/v1/user/product/list"),
};

//auth
export const AuthService = {
  doRegister: (data) => API.post("/api/v1/user/authentication/register", data),
  doLogin: (data) => API.post("/api/v1/user/authentication/login01", data),
  doForgot: (data) => API.post("/api/v1/user/forgot/email", data),
  doResetPass: (data) => API.post("/api/v1/user/forgot/verify", data),
  doVerifyMail: (data) => API.post("/api/v1/user/verify/email", data),
};
