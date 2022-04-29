import { useEffect, useState } from 'react';
import { b64DecodeUnicode, b64EncodeUnicode } from './base64-utils';

const initialValue = {
  accesstoken: null,
  refreshtoken: null,
};

export const useAuth = (callback) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const authstore = window.localStorage.getItem('authstore')
        ? window.localStorage.getItem('authstore')
        : window.sessionStorage.getItem('authstore');
      const authstoreDecode = window.atob(authstore || '');
      return authstoreDecode ? JSON.parse(authstoreDecode) : initialValue;
    } catch (err) {
      console.error(err);
      return {};
    }
  });

  useEffect(() => {
    if (storedValue.accesstoken) {
      const encodeVal = b64EncodeUnicode(JSON.stringify(storedValue));
      window.localStorage.setItem('authstore', encodeVal);
      callback && callback();
    }
  }, [storedValue, callback]);

  const setValue = (value) => {
    try {
      setStoredValue(value);
    } catch (err) {
      console.error(err);
    }
  };
  return [storedValue, setValue];
};

export const isLoggedIn = () => {
  try {
    const authstore = window.localStorage.getItem('authstore') || '{}';
    const authstoreDecode = b64DecodeUnicode(authstore || '');
    const authstoreObj = JSON.parse(authstoreDecode);
    if (authstoreObj && authstoreObj.accesstoken) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const logoutAuth = () => {
  window.localStorage.removeItem('authstore');
};

export const getJWT = () => {
  const authstoreStr = window.localStorage.getItem('authstore') || '{}';
  try {
    const authstoreDecode = b64DecodeUnicode(authstoreStr || '');
    const authstoreJson = JSON.parse(authstoreDecode) || initialValue;
    return authstoreJson.accesstoken;
  } catch (error) {
    return '';
  }
};
