import { Button, Card, Divider } from "antd";
import { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import styled from "@emotion/styled";
import useDocumentTitle from "logichooks/useDocumentTitle";
import { ErrorBox } from "components/lib";
import onthewind from "assets/on-the-wind.jpg";

export const UnAuthentIcatedAPP = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("请登录注册以继续", false);

  return (
    <Container>
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        <ErrorBox error={error} />
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? (
            <SpanContainer>已经有账号了？直接登陆</SpanContainer>
          ) : (
            <SpanContainer>还没有新账号？注册新账号</SpanContainer>
          )}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 2.4rem;
  color: rgb(160, 124, 207);
`;
export const SpanContainer = styled.span`
  color: rgb(160, 124, 207);
`;
// @emotion 只能跟html标签 其他标签要这样写
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  background-image: url(${onthewind});
  border-color: transparent;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: left bottom;
  z-index: 1;
  position: relative;
  ::after {
    position: absolute;
    left: 0;top: 0;
    bottom: 0;right: 0;
    content: '';
    background: url(${onthewind});
    background-size:cover ;
    z-index: -1;
    filter: blur(37px);
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${onthewind});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: left bottom;
`;
