import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.221.178.199:8083'
});

export default instance;
