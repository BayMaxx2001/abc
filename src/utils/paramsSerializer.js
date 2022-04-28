import _ from 'lodash';

export const paramsSerializer = (params) =>
  _.map(params, (value, key) => {
    if (_.isArray(value)) {
      return _.map(value, (item) => {
        if (item) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(item)}`;
        }
        return '';
      })
        .filter(Boolean)
        .join('&');
    }
    return value || typeof value === 'boolean'
      ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      : '';
  })
    .filter(Boolean)
    .join('&');

export const getQueryString = (queryString) => {
  const query = (queryString || '').substring(1); // delete ?
  if (!query) {
    return {};
  }
  return _.split(query, '&')
    .map((params) => {
      const p = params.split('=');
      return [p[0], decodeURIComponent(p[1])];
    })
    .reduce((obj, [key, value]) => {
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      if (obj[key]) {
        if (Array.isArray(obj[key])) {
          obj[key] = [...obj[key], value];
        } else {
          obj[key] = [obj[key], value];
        }
      } else {
        obj[key] = value;
      }
      return obj;
    }, {});
};
