import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import { useEffect } from "react";
import { useProjectIdUrl } from "screen/kanban/utils";
import { useEpicsQueryKey } from "./config";
import { useAddEpics } from "./utils"; 

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & {onClose: () => void}) => {
    const [form] = useForm();
    const {mutate: addEpic, isLoading, error} = useAddEpics(useEpicsQueryKey());
    const projectId = useProjectIdUrl();

    const onFinish = async (values: any) => {
        await addEpic({...values, projectId});
        props.onClose();
    };

    useEffect(() => { 
        form.resetFields();
    }, [form, props.visible]);

    return <Drawer open={props.visible} onClose={props.onClose} forceRender destroyOnClose width={'100%'}>
        <Container>
        {isLoading? <Spin size="large" />: <>
                    <h1>创建任务组</h1> 
                    <ErrorBox error={error}/>
                    <Form form={form} onFinish={onFinish} layout="vertical" style={{width: '40rem'}}>
                        <Form.Item label={'项目'} name={'name'} rules={[{required: true, message: '请输入任务组名'}]}>
                            <Input placeholder="请输入任务组 名称"/>
                        </Form.Item>
                        <Form.Item style={{textAlign: 'right'}}>
                            <Button loading={isLoading}  type="primary" htmlType="submit">提交</Button>
                        </Form.Item>  
                    </Form>
                </>}
        </Container>
    </Drawer>
};

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
  