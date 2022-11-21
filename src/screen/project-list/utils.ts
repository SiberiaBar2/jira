import { useMemo } from "react";
import { useQueryParam } from "logichooks/useQueryParam";

export const useProjectSearchParam = () => {

    const memoizedParam = useMemo(() => {// 使地址不变
        return ['name', 'personId'];
    },[]);
    const [param, setParam] = useQueryParam(memoizedParam);

    return [
        useMemo(() => {
           return {...param, personId: Number(param.personId) || undefined};
        }, [param]),
        setParam
    ] as const // as const 解决了使用时 变量和函数类型报错的问题
};
