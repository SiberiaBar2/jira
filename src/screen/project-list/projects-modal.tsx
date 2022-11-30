import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import { UseSelect } from "components/use-select";
import { useAddProject, useEditProject } from "logichooks/useEditProject";
import { useEffect } from "react";
import { useProjectModal, useProjectsQueryKey } from "./utils";

const ProjectsModal = () => {
    const {projectModalOpen, close, editingProject, isLoading} = useProjectModal();
    const useMutataProject = editingProject ? useEditProject : useAddProject; 
    const {mutateAsync, isLoading: mutateLoading, error, } = useMutataProject(useProjectsQueryKey());
    
    const [form] = useForm()
    const onFinish = (values: any) => {
        mutateAsync({...editingProject, ...values}).then(() => {
            form.resetFields();
            close();
        })
    };

    const title = editingProject ? '编辑项目': '创建项目';

    const closeModal = () => {
        form.resetFields();
        close();
    };

    useEffect(() => {
        form.setFieldsValue(editingProject);
    }, [editingProject, form]);

    // forceRender 解决 Form 不显示时渲染报错问题 
    return (
        <Drawer forceRender={true} width={'100%'} open={projectModalOpen} onClose={closeModal}>
            <Container>
                {isLoading? <Spin size="large" />: <>
                    <h1>{title}</h1>
                    <ErrorBox error={error}/>
                    <Form form={form} onFinish={onFinish} layout="vertical" style={{width: '40rem'}}>
                        <Form.Item label={'项目'} name={'name'} rules={[{required: true, message: '请输入项目名称'}]}>
                            <Input placeholder="请输入项目名称"/>
                        </Form.Item>
                        <Form.Item label={'部门'} name={'organization'} rules={[{required: true, message: '请输入部门名称'}]}>
                            <Input placeholder="请输入部门名称"/>
                        </Form.Item> 
                        <Form.Item label={'负责人'} name={'personId' }>
                            <UseSelect defaultOptionName={'负责人'}/>
                        </Form.Item>  
                        <Form.Item style={{textAlign: 'right'}}>
                            <Button loading={mutateLoading}  type="primary" htmlType="submit">提交</Button>
                        </Form.Item>  
                    </Form>
                </>}
            </Container>
        </Drawer>
    )
};

export default ProjectsModal;

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
