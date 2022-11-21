import { useCallback, useState } from "react";
import { useMountRef } from "./useMountRef";

interface State<D> {
    error: Error | null
    data: D | null
    stat: 'idle' | 'loading' | 'error' | 'succcess'
}

const defaultInitialState : State<null> = {
    error: null,
    data: null,
    stat: "idle"
}

const defaultConfig = {
    throwOnError: false
};

const useSync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, initialConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState,
    });

    const mountedRef = useMountRef();

    const [retry, setRetry] = useState(() => () => {});

    const setData = useCallback((data: D) => {
        setState({
            data,
            stat: 'succcess',
            error: null
        });
    },[]);
    
    const setError = useCallback((error: Error) => {
        setState({
            error,
            stat: 'error',
            data: null
        });
    },[]);

    // run 用来触发异步请求
    const run = useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
        if(!promise || !promise.then) {
            throw new Error('请传入promise类型数据');
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig.retry() , runConfig);
            }
            // 不能用这种方式
            // if (promise) {
            //     run(promise);
            // }
        });
        setState(prevState => { // 这样state就不会引入到依赖项 引发无限渲染了
            return {
                ...prevState,
                stat: 'loading',
            }
        })
        return promise
        .then(data => {
            if (mountedRef.current)
            setData(data); 
            return data;
        })
        .catch(error => {
            setError(error);
            if (config.throwOnError) return Promise.reject(error);
            return error;
        })
    },[config.throwOnError, mountedRef, setData, setError]);

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'succcess',
        run,
        setData,
        setError,
        ...state,
        retry,
    };
};

export default useSync; 
