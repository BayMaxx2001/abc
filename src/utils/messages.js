import { message } from 'antd';

export const successMsg = (msg, durations, callback) => {
  message.success(msg, durations, callback && callback());
};

export const errorMsg = (msg, durations, callback) => {
  message.error(msg, durations, callback && callback());
};

export const warningMsg = (msg, durations, callback) => {
  message.warning(msg, durations, callback && callback());
};
