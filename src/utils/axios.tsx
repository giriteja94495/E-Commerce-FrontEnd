import axios from 'axios';
import { useRouter } from 'next/router';
import { BASE_URL_ } from './urls';

export const instance = axios.create({
  baseURL: BASE_URL_,
});

instance.interceptors.response.use(
  (response) => {
    debugger
    return response;
  },
  (error) => {
    debugger
    const router = useRouter();

    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Unauthorized, redirect to login page
        router.push('/login');
      } else if (status === 404) {
        // Not Found, redirect to a 404 error page
        router.push('/404');
      } else {
        // For other status codes, you can redirect to a generic error page
        router.push('/error');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request made but no response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up the request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
