import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  Select,
  message,
  Menu,
} from 'antd';
import axios from 'axios';
import { Store } from 'antd/lib/form/interface';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const { Header, Content, Footer } = Layout;
function Survey() {
  const [lock, setLock] = useState(false);
  const [form] = Form.useForm();

  const submitAnswers = async (data: Store) => {
    setLock(true);
    const res = await axios.post<{ success: boolean }>(
      'http://localhost:3001/survey',
      data,
    );
    if (res?.data.success) {
      form.resetFields();
      message.success('Survey Response Recorded!');
    } else {
      message.error('Something went wrong... Try again later');
    }
    setLock(false);
  };
  const onFinish = (values: Store) => {
    submitAnswers(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="survey-page">
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/analysis">See Analysis</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Title>About you Survey</Title>
            <Form
              {...layout}
              name="basic"
              form={form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Your Favorite Fruit"
                name="fruit"
                rules={[
                  {
                    required: true,
                    message: 'Please tell us your favorite fruit.',
                  },
                ]}
              >
                <Input placeholder="Apple, Orange ..." disabled={lock} />
              </Form.Item>

              <Form.Item
                label="Your Favorite Color"
                name="color"
                rules={[
                  {
                    required: true,
                    message: 'Please tell us your favorite color.',
                  },
                ]}
              >
                <Select placeholder="Select an option" disabled={lock}>
                  <Option value="Red">Red</Option>
                  <Option value="Green">Green</Option>
                  <Option value="Blue">Blue</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Your Favorite Animal"
                name="animal"
                rules={[
                  {
                    required: true,
                    message: 'Please tell us your favorite animal.',
                  },
                ]}
              >
                <Select placeholder="Select an option" disabled={lock}>
                  <Option value="Cat">Cat</Option>
                  <Option value="Dog">Dog</Option>
                  <Option value="Turtle">Turtle</Option>
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" block disabled={lock}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Crafted by Yong Lin Wang
        </Footer>
      </Layout>
    </div>
  );
}

export default Survey;
