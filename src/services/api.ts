import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://localhost:5001/api/',
   validateStatus: (status) => {
      return status >= 200 && status <= 500
   }
});