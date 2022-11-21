import {useMemo} from "react";
import {useQueryParam} from "logichooks/useQueryParam";

export const useProjectSearchParam = () => {

    const memoizedParam = useMemo(() => {// 使地址不变
        return ['name', 'personId'];
    }, []);
    const [param, setParam] = useQueryParam(memoizedParam);

    return [
        useMemo(() => {
            return {...param, personId: Number(param.personId) || undefined};
        }, [param]),
        setParam
    ] as const // as const 解决了使用时 变量和函数类型报错的问题
};

// 全局url状态管理器

export const useProjectModal = () => {
    const memoizedParam = useMemo(() => ['projectCreate'], []);
    const [{projectCreate}, setProjectCreate] = useQueryParam(memoizedParam);

    const open = () => setProjectCreate({projectCreate: true});
    const close = () => setProjectCreate({projectCreate: undefined});

    return {// 这里 useQueryParam 的第二个参数 （函数）会把 参数值 变成一个字符串， 所以 为 'true'
        projectModalOpen: projectCreate === 'true', open, close,
    }
};
