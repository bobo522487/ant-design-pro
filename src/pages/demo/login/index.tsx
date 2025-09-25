import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Form, FormItem, Input, Password, Submit } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Card, message, Tabs } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import { VerifyCode } from './VerifyCode';

const normalForm = createForm({
  validateFirst: true,
});

const phoneForm = createForm({
  validateFirst: true,
});

const handleSendCode = async (phoneNumber: string) => {
  try {
    console.log(`发送验证码到手机号: ${phoneNumber}`);
    // 模拟发送验证码
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // 这里不能直接使用 message，因为不在组件上下文中
    console.log(`验证码已发送到 ${phoneNumber}`);
  } catch (error) {
    console.error('发送验证码失败，请重试');
    throw error;
  }
};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  scope: {
    icon(name: 'UserOutlined' | 'LockOutlined' | 'PhoneOutlined') {
      switch (name) {
        case 'UserOutlined':
          return <UserOutlined />;
        case 'LockOutlined':
          return <LockOutlined />;
        case 'PhoneOutlined':
          return <PhoneOutlined />;
        default:
          return null;
      }
    },
    handleSendCode,
  },
});

const normalSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
};

const phoneSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
      title: '手机号',
      required: true,
      'x-validator': 'phone',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: 'string',
      title: '验证码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'VerifyCode',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
        onSendCode: '{{handleSendCode}}',
      },
      'x-reactions': [
        {
          dependencies: ['.phone#value', '.phone#valid'],
          fulfill: {
            state: {
              'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
              'component[1].phoneNumber': '{{$deps[0]}}',
            },
          },
        },
      ],
    },
  },
};

export default () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log('登录信息:', values);
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('登录成功！');
    } catch (_error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    {
      key: '1',
      label: '账密登录',
      children: (
        <Form
          form={normalForm}
          layout="vertical"
          size="large"
          onAutoSubmit={handleSubmit}
        >
          <SchemaField schema={normalSchema} />
          <Submit block size="large" loading={loading}>
            登录
          </Submit>
        </Form>
      ),
    },
    {
      key: '2',
      label: '手机登录',
      children: (
        <Form
          form={phoneForm}
          layout="vertical"
          size="large"
          onAutoSubmit={handleSubmit}
        >
          <SchemaField schema={phoneSchema} />
          <Submit block size="large" loading={loading}>
            登录
          </Submit>
        </Form>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Tabs items={tabItems} className={styles.tabs} centered />
        <div className={styles.footer}>
          <a href="#新用户注册" className={styles.footerLink}>
            新用户注册
          </a>
          <a href="#忘记密码" className={styles.footerLink}>
            忘记密码?
          </a>
        </div>
      </Card>
    </div>
  );
};
