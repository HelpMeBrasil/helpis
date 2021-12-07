import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://helpls.azurewebsites.net/',
   validateStatus: (status) => {
      return status >= 200 && status <= 500
   }
});