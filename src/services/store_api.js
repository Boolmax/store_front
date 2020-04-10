import axios from 'axios';
//https://tcc-store-api.herokuapp.com
const api = axios.create({baseURL: 'http://localhost:3001/'});

export default api;