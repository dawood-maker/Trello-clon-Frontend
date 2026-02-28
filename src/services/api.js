import axios from "axios";

const API_URL = "http://localhost:5002/api";
//===================================
// Create axios instance
//===================================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//===================================
// Add token to requests
//===================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(
    "API Request:",
    config.method.toUpperCase(),
    config.url,
    config.data || "No body",
  ); //  Log request
  return config;
});
//===================================
// Add response logging
//===================================
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.config.url, response.data); //  Log successful response
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.config?.url,
      error.response?.data || error.message,
    ); //  Log error
    return Promise.reject(error);
  },
);
//===================================
// Auth APIs
//===================================
export const authAPI = {
  register: (data) => {
    console.log("Calling authAPI.register with data:", data);
    return api.post("/auth/register", data);
  },
  login: (data) => {
    console.log("Calling authAPI.login with data:", data);
    return api.post("/auth/login", data);
  },
  forgotPassword: (data) => {
    console.log("Calling authAPI.forgotPassword with data:", data);
    return api.post("/auth/forgot-password", data);
  },
  resetPassword: (data) => {
    console.log("Calling authAPI.resetPassword with data:", data);
    return api.post("/auth/reset-password", data);
  },
};
//===================================
// Board APIs
//===================================
export const boardAPI = {
  getAll: () => {
    console.log("Calling boardAPI.getAll");
    return api.get("/boards");
  },
  getOne: (id) => {
    console.log("Calling boardAPI.getOne for boardId:", id);
    return api.get(`/boards/${id}`);
  },
  create: (data) => {
    console.log("Calling boardAPI.create with data:", data);
    return api.post("/boards", data);
  },
  update: (id, data) => {
    console.log("Calling boardAPI.update for boardId:", id, "with data:", data);
    return api.put(`/boards/${id}`, data);
  },
  delete: (id) => {
    console.log("Calling boardAPI.delete for boardId:", id);
    return api.delete(`/boards/${id}`);
  },
};
//===================================
// Column APIs
//===================================
export const columnAPI = {
  getAll: (boardId) => {
    console.log("Calling columnAPI.getAll for boardId:", boardId);
    return api.get(`/boards/${boardId}/columns`);
  },
  create: (boardId, data) => {
    console.log(
      "Calling columnAPI.create for boardId:",
      boardId,
      "with data:",
      data,
    );
    return api.post(`/boards/${boardId}/columns`, data);
  },
  update: (id, data) => {
    console.log(
      "Calling columnAPI.update for columnId:",
      id,
      "with data:",
      data,
    );
    return api.put(`/columns/${id}`, data);
  },
  delete: (id) => {
    console.log("Calling columnAPI.delete for columnId:", id);
    return api.delete(`/columns/${id}`);
  },
  reorder: (data) => {
    console.log("Calling columnAPI.reorder with data:", data);
    return api.post("/columns/reorder", data);
  },
};
//===================================
// Card APIs
//===================================
export const cardAPI = {
  getAll: (columnId) => {
    console.log("Calling cardAPI.getAll for columnId:", columnId);
    return api.get(`/columns/${columnId}/cards`);
  },
  create: (columnId, data) => {
    console.log(
      "Calling cardAPI.create for columnId:",
      columnId,
      "with data:",
      data,
    );
    return api.post(`/columns/${columnId}/cards`, data);
  },
  update: (id, data) => {
    console.log("Calling cardAPI.update for cardId:", id, "with data:", data);
    return api.put(`/cards/${id}`, data);
  },
  delete: (id) => {
    console.log("Calling cardAPI.delete for cardId:", id);
    return api.delete(`/cards/${id}`);
  },
  move: (id, data) => {
    console.log("Calling cardAPI.move for cardId:", id, "with data:", data);
    return api.put(`/cards/${id}/move`, data);
  },
};

export default api;
