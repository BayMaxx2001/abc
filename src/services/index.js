import { message } from 'antd';
import axios from 'axios';
import { getJWT, logoutAuth } from 'src/utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { paramsSerializer } from '../utils/paramsSerializer';
// import _ from 'lodash'
axios.defaults.withCredentials = false;
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ENPOINT;
axios.defaults.paramsSerializer = paramsSerializer;

axios.interceptors.request.use(async (config) => {
  const token = getJWT();
  if (token) {
    config.headers.common = { Authorization: `Bearer ${token}` };
  }
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === 401) {
      message.info('Pleases sign in again!', 2, () => {
        logoutAuth();
        const location = useLocation();
        const navigate = useNavigate();
        navigate('/login', { replace: true, state: location });
      });
    }
    return { status: response.status, data: response.data };
  },
  (error) => Promise.reject(error),
);

const errorHandler = (e) => {
  console.log(e);
  console.log('API ERROR', e.response);
  if (e.response && e.response.status === 401) {
    message.info('Pleases sign in again!', 2, () => {
      logoutAuth();
      const location = useLocation();
      const navigate = useNavigate();
      navigate('/login', { replace: true, state: location });
    });
    return Promise.resolve();
  }
  if (e.response && e.response.data && e.response.data.error) {
    return Promise.resolve(e.response.data);
  }
  if (e.response) {
    return Promise.resolve({ error: { code: e.response.status } });
  }
  return Promise.resolve();
};

export const getAPI = (target, params, settings = {}) =>
  axios
    .get(target, {
      ...settings,
      params: params || {},
    })
    .then((resp) => Promise.resolve(resp))
    .catch((e) => errorHandler(e));

export const postAPI = (target, data) =>
  axios
    .post(target, data)
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const putAPI = (target, data) =>
  axios
    .put(target, data)
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const delAPI = (target, data) =>
  axios
    .delete(target, data)
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const postAPIConfig = (target, data, config) =>
  axios
    .post(target, data, config)
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);
