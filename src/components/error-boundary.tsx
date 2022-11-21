import React from "react";

type FallBackRender = (props: {error : Error | null}) => React.ReactElement;
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallBackrender: FallBackRender}>, any> {
    state: Readonly<any> = {
        error: null,
    }; 
    // 当子组件抛出异常 这里会收到并调用
    static getDerivedStateFormError(error: Error) {
        return {error};
    };

    render(): React.ReactNode {
        const {error} = this.state;
        const {fallBackrender , children} = this.props;

        if (error) {
            return fallBackrender(error);
        }
        return children;
    };
}