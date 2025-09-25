import { MessageOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';

interface IVerifyCodeProps {
  value?: any;
  onChange?: (value: any) => void;
  readyPost?: boolean;
  phoneNumber?: string;
  style?: React.CSSProperties;
  onSendCode?: (phoneNumber: string) => Promise<void>;
}

export const VerifyCode: React.FC<
  React.PropsWithChildren<IVerifyCodeProps>
> = ({ value, onChange, readyPost, phoneNumber, onSendCode, ...props }) => {
  const [lastTime, setLastTime] = useState(0);
  const [sending, setSending] = useState(false);

  const counting = (time = 60) => {
    if (time < 0) {
      setLastTime(0);
      return;
    }
    setLastTime(time);
    setTimeout(() => {
      counting(time - 1);
    }, 1000);
  };

  const handleSendCode = async () => {
    if (!phoneNumber || !readyPost) return;

    setSending(true);
    try {
      if (onSendCode) {
        await onSendCode(phoneNumber);
      } else {
        console.log(`发送验证码到手机号: ${phoneNumber}`);
      }
      counting();
    } catch (error) {
      console.error('发送验证码失败:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', gap: 8, ...props.style }}>
      <Input
        {...props}
        style={{ flex: 1, ...props.style }}
        value={value}
        onChange={onChange}
        placeholder="请输入验证码"
        prefix={<MessageOutlined />}
      />
      <Button
        type="primary"
        style={{ minWidth: 120 }}
        disabled={!readyPost || lastTime > 0 || sending}
        loading={sending}
        onClick={handleSendCode}
      >
        {lastTime > 0 ? `剩余${lastTime}秒` : '发送验证码'}
      </Button>
    </div>
  );
};
