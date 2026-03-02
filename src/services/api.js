import axios from "axios";

const API_URL = "http://localhost:5002/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Token automatically har request mein lagao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log("➡️ API Request:", config.method.toUpperCase(), config.url, config.data || "");
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.config?.url, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ===========================
// Auth APIs
// ===========================
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.post("/auth/reset-password", data),
};

// ===========================
// Board APIs
// ===========================
export const boardAPI = {
  getAll: () => api.get("/boards"),
  getOne: (id) => api.get(`/boards/${id}`),
  create: (data) => api.post("/boards", data),       // { name, color }
  update: (id, data) => api.put(`/boards/${id}`, data),
  delete: (id) => api.delete(`/boards/${id}`),
};

// ===========================
// Column APIs  ✅ FIXED — backend routes se match
// ===========================
export const columnAPI = {
  // GET /api/columns/board/:boardId
  getAll: (boardId) => api.get(`/columns/board/${boardId}`),

  // POST /api/columns  body: { title, boardId }
  create: (boardId, data) => api.post("/columns", { boardId, ...data }),

  // PUT /api/columns/:id
  update: (id, data) => api.put(`/columns/${id}`, data),

  // DELETE /api/columns/:id
  delete: (id) => api.delete(`/columns/${id}`),
};

// ===========================
// Card APIs  ✅ FIXED — backend routes se match
// ===========================
export const cardAPI = {
  // GET /api/cards/column/:columnId
  getAll: (columnId) => api.get(`/cards/column/${columnId}`),

  // POST /api/cards  body: { text, columnId }
  create: (columnId, data) => api.post("/cards", { columnId, ...data }),

  // PUT /api/cards/:id
  update: (id, data) => api.put(`/cards/${id}`, data),

  // DELETE /api/cards/:id
  delete: (id) => api.delete(`/cards/${id}`),

  // PUT /api/cards/:id/move
  move: (id, data) => api.put(`/cards/${id}/move`, data),
};

export default api;