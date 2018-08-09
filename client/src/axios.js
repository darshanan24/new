import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://izac-af5d7.firebaseio.com/'
});

export default instance;
