import { getAPI, postAPI, putAPI, delAPI } from '.';

export const GetStores = (offset, limit) => getAPI(`stores/?offset=${offset}&limit=${limit}`);

export const CreateStore = (data) => postAPI(`stores/`, data);

export const EditStore = (id, data) => putAPI(`stores/${id}/`, data);

export const DelStore = (id) => delAPI(`stores/${id}/`);
