import { postAPI } from '.';

export const LoginAPI = (data) => postAPI('token/', data);
