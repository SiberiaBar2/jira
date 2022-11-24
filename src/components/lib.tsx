import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number,
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom: ${props => props.marginBottom + 'rem'};
> * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`
const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
const FullPageLoading = () => <FullPage>
    <Spin />
</FullPage>;


const FullPageErrorFallback = ({error}: {error: Error | null}) => <FullPage>
        <DevTools />
        <ErrorBox error={error} />
</FullPage>;

// 类型守卫

// 当符合条件 value?.message 时 即 value存在message属性时， value为 Error类型
const isError = (value: any): value is Error => value?.message; 

const ErrorBox = ({error}: {error?: unknown}) => {
    if (isError(error)) {
        return <Typography.Text type="danger">{error?.message}</Typography.Text>;
    }
    return null;
};

const ButtonNoPadding = styled(Button)`
    padding: 0;
`
const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export {
    Row,
    FullPageLoading,
    FullPageErrorFallback,
    ButtonNoPadding,
    ErrorBox,
    ScreenContainer,
};
