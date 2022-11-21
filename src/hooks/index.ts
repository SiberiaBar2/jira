import { useEffect, useState } from "react";

export const useMount = (callBack: () => void) => {
  useEffect(() => {
    callBack();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<V>(value);

  useEffect(() => {
    // 每次在value变化以后设置一个定时器
    let timeout = setTimeout(() => setDebouncedValue(value), delay);

    // 每次在上一个的effect执行完后执行
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return debouncedValue;
};
