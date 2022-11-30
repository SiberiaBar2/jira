import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import useSync from "logichooks/useSync";
import { LongButton } from "unauthenticated";

const RegisterScreen = ({onError}: {onError : (error: Error) => void}) => {
  const { register } = useAuth();
  const {isLoading , run} = useSync(undefined, {throwOnError: true});

  const handelSubmit = async ({ cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    if(cpassword !== values.password) {
      onError(new Error('请确认两次密码是否一致'));
      return;
    }
    try {
      await run(register(values));
    }
    catch (e) {
      onError(e as Error);
    }
  };

  return (
    <Form onFinish={handelSubmit}>
      <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder="用户名" type='text' />
      </Form.Item>
      <Form.Item name='password' rules={[{required: true, message: '请输入密码'}]}>
        <Input placeholder="密码" type='password' />
      </Form.Item>
      <Form.Item name='cpassword' rules={[{required: true, message: '请确认密码'}]}>
        <Input placeholder="确认密码" type='password' />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type={"primary"}>注册</LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
