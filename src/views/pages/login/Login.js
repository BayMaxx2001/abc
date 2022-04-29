import { createRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Row, Form, Input, Button, message } from 'antd';
import { isLoggedIn, useAuth } from 'src/utils/auth';
import { LoginAPI } from 'src/services/AuthService';
import { logo } from 'src/assets/brand/logo';
import CIcon from '@coreui/icons-react';

const Login = () => {
  const formRef = createRef();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate();
  const setAuthStored = useAuth(() => navigate(from, { replace: true }))[1];
  useEffect(() => {
    if (isLoggedIn()) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const login = async (data) => {
    try {
      const results = await LoginAPI(data);
      console.log(results);
      if (results.status === 200) {
        setAuthStored({
          accesstoken: results.data.access,
          refreshtoken: results.data.refresh,
        });
      } else {
        message.error('Tên đăng nhập hoặc mật khẩu không chính xác !', 2);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng kiểm tra lại !', 2);
    }
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('username', values.login);
    formData.append('password', values.password);
    login(formData);
  };

  return (
    <Row align="middle" justify="center">
      <Col
        className="gutter-row flex justify-center"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={12}
        xl={10}
      >
        <div className="w-full p-14">
          <div className="shadow-lg rounded p-4">
            <div className="cursor-pointer text-center">
              <a href="http://localhost:3000">
                <CIcon icon={logo} height={48} alt="Logo" />
              </a>
            </div>
            <p className="text-3xl font-medium mt-5">Sign in</p>
            <Form
              name="control-ref"
              className="mt-9"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              layout="vertical"
              onFinish={onFinish}
              ref={formRef}
            >
              <Form.Item
                label="Username"
                name="login"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
                hasFeedback
              >
                <Input size="large" placeholder="Please enter your password" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                tooltip="Mật khẩu dài nhất 8 ký tự, ít nhất một ký tự hoa, một ký tự viết thường, một số, một ký tự đặc biệt"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password size="large" placeholder="Please enter your password" />
              </Form.Item>

              <div className="flex justify-end w-full mb-5">
                <Button type="link" size="large" htmlType="button">
                  Forgot Password?
                </Button>
              </div>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button className="w-full" type="primary" size="large" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
      <Col
        className="gutter-row flex justify-center select-none"
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={12}
        xl={14}
      >
        <div className="bg-[url('src/assets/images/background-login.png')] bg-cover bg-center w-full h-screen" />
      </Col>
    </Row>
  );
};

export default Login;
