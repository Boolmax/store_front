import axios from 'axios';

const api = axios.create({baseURL: 'https://tcc-store-api.herokuapp.com/'});

export default api;