import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal } from 'antd';

const EditStoreModal = ({ visible, onClose, onSubmit, defaultValues }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [defaultValues, form]);
  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Edit store"
      visible={visible}
      onOk={onFinish}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} size="large" htmlType="button">
          Cancel
        </Button>,
        <Button form="formEditstore" key="submit" type="primary" size="large" htmlType="submit">
          Submit
        </Button>,
      ]}
    >
      <Form
        name="formEditstore"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={defaultValues}
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

EditStoreModal.propTypes = {};

export default EditStoreModal;
