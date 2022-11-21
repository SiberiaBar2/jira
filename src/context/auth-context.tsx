import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";

import { User } from "screen/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "hooks";
import useSync from "logichooks/useSync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

// 刷新时根据已经存过的 token 重新获取user信息
export const bootStrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {data: user, error, isIdle, isError, isLoading, isSuccess, run, setData: setUser} = useSync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser); // ?? 为什么能这么写
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootStrapUser());
    // bootStrapUser().then(setUser);
  });

  // 如果未运行或运行中 显示 loading 页面
  // 因为有了loading，页面不会先是登录一闪而过，再是列表页了
  if (isIdle || isLoading) { // 为什么这里就是同步的了？
    return <FullPageLoading />;
  }

  // 如果发生了错误 显示错误页面
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在auth-provider中使用");
  }
  return context;
};
