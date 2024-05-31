import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.vandvietnam.com/api/pokemon-api/',
    timeout: 1000,
  });

export default instance