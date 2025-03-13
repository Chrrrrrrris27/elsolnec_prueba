import { Post } from '../models/Post';
import { User } from '../models/User';

export const getFilteredUsers = (query: string, initialUsers: User[]): User[] => {
  if (query.length === 0) return initialUsers;
  return initialUsers.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.username.toLowerCase().includes(query.toLowerCase())
  );
}

export const getFilteredPosts = (query: string, initialPosts: Post[]): Post[] => {
  if (query.length === 0) return initialPosts;
  return initialPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase())
  );
}

export const sortPostsByTitle = (asc: boolean, posts: Post[]): Post[] => {
  if (asc) {
    return [...posts].sort((a, b) => a.title.localeCompare(b.title));
  }
  return [...posts].sort((a, b) => b.title.localeCompare(a.title));
}

export const sortPostsById = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => a.id - b.id);
}