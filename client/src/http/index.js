import axios from 'axios';

const $host = axios.create({
  baseURL: 'https://mobilestoresntu.herokuapp.com',
  //baseURL: 'http://localhost:4000',
});

export { $host };