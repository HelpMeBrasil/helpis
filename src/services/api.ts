import axios from 'axios';

export const api = axios.create({
   //baseURL: 'http://localhost:5000/api/',
   baseURL: 'https://helpls.azurewebsites.net/api/',
   validateStatus: (status) => {
      return status >= 200 && status <= 500
   }
});