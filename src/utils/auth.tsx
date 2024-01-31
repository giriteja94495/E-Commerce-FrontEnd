import jwt from 'jsonwebtoken';
import { BASE_URL_ } from './urls';

const SECRET_KEY = '!@#$%^&*()_+'; 

export const generateToken = (userId: string) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '7d' });
    return token;
 };



export const isUserAuthenticated = async (token: string) => {
  try {
    if (!token) {
      return false;
    }
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userExists = await checkUserExistence(decodedToken.userId);
    return true;
  } catch (error) {
    return false;
  }
};
const checkUserExistence = async (userId: string) => {
    const django_base_url_for_users = `${BASE_URL_}/users/`;
    const response = await fetch(django_base_url_for_users + userId);
    const data = await response.json();
    if(data.id == userId){
        return true;
    }
    return false;
  };
