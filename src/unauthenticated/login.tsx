import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated";
import useSync from "logichooks/useSync";

const LoginScreen = ({onError}: {onError : (error: Error) => void}) => {
  const { login } = useAuth();
  const {isLoading , run, error} = useSync(undefined, {throwOnError: true});

  const handelSubmit = async (values: {username: string, password: string}) => {
    try {
      await run(login(values)); // 由于 login 是异步函数，所以 login 没执行完，下面的catch就执行完了， 所以使用 async await组合
    } catch (e) { // 此处无法指定类型
      onError(e as Error);
    }
  };

  return (
    <Form onFinish={handelSubmit}>
      {/* <Button onClick={() => {throw new Error('异常')}}>异常</Button> */}
      <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder="用户名" type='text' />
      </Form.Item>
      <Form.Item name='password' rules={[{required: true, message: '请输入密码'}]}>
        <Input placeholder="密码" type='password' />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type={"primary"}>登录</LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
