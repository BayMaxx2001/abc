import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal } from 'antd';

const AddStoreModal = ({ visible, onClose, onSubmit }) => {
  const formRef = useRef(null);
  const onFinish = (values) => {
    onSubmit(values);
    formRef.current?.resetFields();
  };

  return (
    <Modal
      title="Add new store"
      visible={visible}
      onOk={onFinish}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} size="large" htmlType="button">
          Cancel
        </Button>,
        <Button form="formAddstore" key="submit" type="primary" size="large" htmlType="submit">
          Submit
        </Button>,
      ]}
    >
      <Form
        name="formAddstore"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        ref={formRef}
      >
        <Form.Item
          label="Store Name"
          name="store_name"
          rules={[{ required: true, message: 'Please input store name!' }]}
        >
          <Input size="large" allowClear placeholder="Enter store name" />
        </Form.Item>
        <Form.Item
          label="API key"
          name="store_api_key"
          rules={[{ required: true, message: 'Please input api key!' }]}
        >
          <Input.Password size="large" allowClear placeholder="Enter api key" />
        </Form.Item>
        <Form.Item
          label="Shared Secret"
          name="share_secret_key"
          rules={[{ required: true, message: 'Please input shared secret!' }]}
        >
          <Input.Password size="large" allowClear placeholder="Enter shared secret" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

AddStoreModal.propTypes = {};

export default AddStoreModal;
