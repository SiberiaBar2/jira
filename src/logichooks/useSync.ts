import { useCallback, useReducer, useState } from "react";
import { useMountRef } from "./useMountRef";

// useSycn useReducer 实现
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountRef();
    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args): void 0), [dispatch, mountedRef]);
};
 
const useSync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig};
    const [state, dispatch] = useReducer((state: State<D>, actions: Partial<State<D>>) => ({...state, ...actions}),{
        ...defaultInitialState,
        ...initialState,
    });

    const safeDispatch = useSafeDispatch(dispatch);

    const [retry, setRetry] = useState(() => () => {});

    const setData = useCallback((data: D) => {
        safeDispatch({
            data,
            stat: 'succcess',
            error: null
        });
    },[safeDispatch]);
    
    const setError = useCallback((error: Error) => {
        safeDispatch({
            error,
            stat: 'error',
            data: null
        });
    },[safeDispatch]);

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
        safeDispatch({stat: 'loading'})
        return promise
        .then(data => {
            setData(data); 
            return data;
        })
        .catch(error => {
            setError(error); 
            if (config.throwOnError) {
                return Promise.reject(error)
            };
            return error;
        })
    },[config.throwOnError, safeDispatch, setData, setError]);

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
