import React, { ReactNode } from "react";
import * as auth from "auth-provider";

import { User } from "screen/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "hooks";
import useSync from "logichooks/useSync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from './auth.slice';
import { AppDispatch } from "store";
import {bootstrap} from "./auth.slice";

export interface AuthForm {
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch: (...args: unknown[]) => Promise<User>  = useDispatch<any>();
  const {error, isIdle, isError, isLoading, run} = useSync<User | null>();

  useMount(() => {
    run(dispatch(bootstrap()));
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
    <>{children}</>
  );
};

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = (form: AuthForm) => dispatch(authStore.login(form));
  const register = (form: AuthForm) => dispatch(authStore.register(form));
  const logout = () => dispatch(authStore.logout());

  return {
    user,
    login,
    register,
    logout,
  };
};
