import api from '../api';
import { User } from '../../types/User';

export const fetchUsers = (count:number) => api.get(`/Users/fetch?count=${count}`);
export const getAllUsers = () => api.get('/Users');
export const getUserById = (id:number) => api.get(`/Users/${id}`);
export const createUser = (user:User) => api.post('/Users', user);
export const updateUser = (id:number, user:User) => api.put(`/Users/${id}`, user);
export const deleteUser = (id:number | undefined) => api.delete(`/Users/${id}`);
export const searchUser = (term:string) => api.get(`/Users/search?name=${term}`);