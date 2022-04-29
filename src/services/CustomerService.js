import { getAPI, postAPI, putAPI, delAPI } from '.';

export const GetCustomers = (offset, limit, searchName, ordering) =>
  getAPI(`customers/?offset=${offset}&limit=${limit}&search=${searchName}&ordering=${ordering}`);
