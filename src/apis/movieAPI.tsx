/* centrar todas las peticiones a https://www.themoviedb.org/ */

import axios from 'axios';

export const movieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '3934847c647bd81d20d0f153395da06f',
    language: 'es-ES',
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
