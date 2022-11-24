import { Button, Card, Divider, Typography } from "antd";
import { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import styled from "@emotion/styled";
import useDocumentTitle from "logichooks/useDocumentTitle";
import { ErrorBox } from "components/lib";

export const UnAuthentIcatedAPP = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle('请登录注册以继续', false);

  return (
    <Container style={{ display: "flex", justifyContent: "center"}}>
      <ShadowCard>
        <Title>
          {isRegister ? '请注册' :'请登录'}
        </Title>
        <ErrorBox />
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登陆" : "还没有新账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h1`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`
// @emotion 只能跟html标签 其他标签要这样写
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
