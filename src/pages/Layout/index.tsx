import { useState, ChangeEvent } from 'react';
import { Outlet, useNavigate, useModel } from '@umijs/max';
import { Avatar, Button, Form, Input, Modal, Typography, message } from 'antd';
import { userLogin } from '@/services/user/userController';
import './index.scss';

type LoginData = {
  username: string;
  password: string;
};

const { Title } = Typography;
const { Search } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { initialState, refresh } = useModel('@@initialState');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [{ avatar }, { setName, setAvatar }] = useModel(user);

  const showModal = () => {
    // console.info(localStorage.getItem('token'));
    if (!initialState?.isLogin) {
      setIsModalOpen(true);
    } else {
      navigate('/edit');
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: LoginData) => {
    // console.info('Success:', values);
    const res = await userLogin(values);
    // console.info(res);
    messageApi.success('Login Success');
    localStorage.setItem('token', res.token);
    refresh();
    setIsModalOpen(false);
    navigate('/edit');
    // console.info(initialState);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.warn('Failed:', errorInfo);
  };

  const backHomePage = () => {
    navigate('/');
  };

  const searchArticle = (value: string) => {
    // console.info(value);
    if (value) {
      navigate(`/${value}`);
    }
    setSearchInputValue('');
  };

  const logout = () => {
    messageApi.info('Logout Success');
    localStorage.clear();
    refresh();
    navigate('/');
    // console.log(initialState);
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
              placeholder="Explore Umi"
              onSearch={searchArticle}
            />
          </div>
          <div className="personal-center-button">
            <Button type="default" onClick={showModal}>
              Write Article
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
                      type="dashed"
                      htmlType="submit"
                    >
                      Loginn
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
          <div className="avatar-container">
            <Avatar size={42} onClick={logout} src={initialState?.avatar} />
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
