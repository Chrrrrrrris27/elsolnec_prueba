import { User } from '../models/User';
export const getFilteredUsers = (query: string, initialUsers: User[]): User[] => {
  return initialUsers.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.username.toLowerCase().includes(query.toLowerCase())
  );
}