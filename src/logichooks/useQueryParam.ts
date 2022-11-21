import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils";

export const useQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return [
        // useMemo (解决新创建对象 和 usedebounce) 引发的无限循环问题
        useMemo(() => {
            return keys.reduce((prev, key) => {
                return {...prev, [key]: searchParams.get(key) || ''}
            }, {} as {[key in K]: string})
        }, [keys, searchParams]),
        (params: Partial<{[key in K]: unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParams), ...params} ) as URLSearchParamsInit;
            return setSearchParams(o);
        }
    ] as const
};
