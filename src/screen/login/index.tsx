import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

// 因为authenticated-app 的存在 ，此文件已弃用

const api = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  const { login, user } = useAuth();

  const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handelSubmit}>
      {user ? (
        <div>
          {" "}
          登陆成功， 用户名: {user?.name}
          token: {user?.token}
        </div>
      ) : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" name="" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};

export default LoginScreen;
