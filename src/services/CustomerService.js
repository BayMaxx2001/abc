import { getAPI, postAPI, putAPI, delAPI } from '.';

export const GetCustomers = (offset, limit, searchName) =>
  getAPI(`customers/?offset=${offset}&limit=${limit}&search=${searchName}`);
