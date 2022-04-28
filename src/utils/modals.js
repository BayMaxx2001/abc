import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const infoDialog = (titleMsg, contentMsg) => {
  Modal.info({
    title: titleMsg,
    content: contentMsg,
    onOk() {},
  });
};

export const successDialog = (contentMsg, callback) => {
  Modal.success({
    content: contentMsg,
    onOk() {
      callback && callback();
    },
  });
};

export const errorDialog = (titleMsg, contentMsg, callback) => {
  Modal.error({
    title: titleMsg,
    content: contentMsg,
    onOk() {
      callback && callback();
    },
  });
};

export const warningDialog = (titleMsg, contentMsg, callback) => {
  Modal.warning({
    title: titleMsg,
    content: contentMsg,
    onOk() {
      callback && callback();
    },
  });
};

export const showDeleteConfirmDialg = (titleMsg, contentMsg, callbackOk, callbackCancel) => {
  confirm({
    title: titleMsg,
    icon: <ExclamationCircleOutlined />,
    content: contentMsg,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      callbackOk && callbackOk();
    },
    onCancel() {
      callbackCancel && callbackCancel();
    },
  });
};
