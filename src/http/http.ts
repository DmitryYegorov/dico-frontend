import Axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API;
export const http = Axios.create({
  baseURL,
});

console.log({ baseURL });
