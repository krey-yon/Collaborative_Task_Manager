import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getTodos = async () => {
  const response = await axios.get(`${API_BASE_URL}/todo`, config);
  return response.data.todos;
};

export const createTodo = async (title: string) => {
  const response = await axios.post(`${API_BASE_URL}/todo/create`, { title }, config);
  return response.data.list;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/todo/delete/${id}`, config);
  return response.data;
};

export const addCollaborator = async (todoId: string, userId: string) => {
  const response = await axios.post(`${API_BASE_URL}/todo/add-collaborator`, { todoId, userId }, config);
  return response.data;
};

export const removeCollaborator = async (todoId: string, userId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/todo/remove-collaborator`, { data: { todoId, userId }, ...config });
  return response.data;
};
