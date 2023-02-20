import { useState, ChangeEvent } from 'react';
import { useModel } from '@modern-js/runtime/model';
import { Outlet, useNavigate } from '@modern-js/runtime/router';
import axios from 'axios';
import { Avatar, Button, Form, Input, Modal, Typography, message } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import user from '../models/user';
import './[search]/index.scss';

type LoginData = {
  userName: string;
  password: string;
};

const { Title } = Typography;
const { Search } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isUserLogin, setIsUserLogin] = useState<boolean>(
    !(localStorage.getItem('token') === undefined),
  );
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ avatar }, { setName, setAvatar }] = useModel(user);

  const showModal = () => {
    // console.info(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      setIsModalOpen(true);
    } else {
      navigate('/article-edit');
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: LoginData) => {
    // console.info('Success:', values);
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/login',
      data: {
        ...values,
      },
    }).then(res => {
      // console.info(res.data);
      setName(res.data.name);
      setAvatar(res.data.avatar);
      localStorage.setItem('token', res.data.token);
      messageApi.success('Login Success');
      setIsUserLogin(true);
      handleOk();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.warn('Failed:', errorInfo);
  };

  const backHomePage = () => {
    navigate('');
  };

  const searchArticle = (value: string) => {
    // console.info(value);
    if (value) {
      navigate(`/${value}`);
    }
    setSearchInputValue('');
  };

  const logout = () => {
    setAvatar(
      'https://p3-passport.byteimg.com/img/mosaic-legacy/3793/3114521287~100x100.awebp',
    );
    localStorage.clear();
    setIsUserLogin(false);
    messageApi.info('Logout Success');
  };

  return (
    <>
      {contextHolder}
      <header>
        <div className="header-container">
          <div className="logo-container" onClick={backHomePage}>
            <img
              className="logo-img"
              src="https://s3.bmp.ovh/imgs/2023/02/17/dadcc86ce8edb02b.png"
              alt="React"
            />
            <Title className="logo-text" level={4}>
              BBS Demo
            </Title>
          </div>
          <div className="placeholder" />
          <div className="search-input-container">
            <Search
              value={searchInputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchInputValue(e.target.value);
              }}
              allowClear
              placeholder="Explore React"
              onSearch={searchArticle}
            />
          </div>
          <div className="personal-center-button">
            <Button type="primary" onClick={showModal}>
              {isUserLogin ? 'Write Article' : 'Login'}
            </Button>
            <Modal
              title="Login"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div style={{ marginTop: '32px' }}>
                <Form
                  name="basic"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 17 }}
                  // style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password autoComplete="true" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8 }}>
                    <Button
                      style={{ width: '150px' }}
                      type="primary"
                      htmlType="submit"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
          <div className="avatar-container">
            <Avatar onClick={logout} size={42} src={avatar} />
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
