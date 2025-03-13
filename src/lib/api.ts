import axios from "axios";
import { User } from "./models/User";
import { Post } from "./models/Post";
import { PostComment } from "./models/PostComment";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", 
});

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get("/posts");
  return response.data;
}

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
}

export const getCommentsByPost = async (id: string): Promise<PostComment[]> => {
  const response = await api.get(`/posts/${id}/comments`);
  return response.data;
}