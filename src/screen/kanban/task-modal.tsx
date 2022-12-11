import { Button, Form, Input, Modal } from "antd";
import { TaskTypeSelect } from "components/task-types-select";
import { UseSelect } from "components/use-select";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "screen/utils";
import { useTaskModal, useTasksQueryKey } from "./utils";

export const TaskModal = () => {
    const {editingTask, editingTaskId, close} = useTaskModal();
    const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTasksQueryKey());
    const {mutate: deleteTask} = useDeleteTask(useTasksQueryKey());

    const layout = {
        labelCol: {span: 8},// 左边的文字
        wrapperCol: {span: 16},// 右边的表单
    };

    const [form] = Form.useForm(); 
    const onCancel = () => {
        form.resetFields();
        close();
    };

    const onOk = async () => {
        await editTask({...editingTask, ...form.getFieldsValue()});
        close();
    };

    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask]);

    const confirmDeleteTask = () => {
        close();
        Modal.confirm({
          title: '确定删除任务吗?',
          content: '点击确定删除',
          okText: '确定',
          cancelText: '取消', 
          onOk() { 
            deleteTask({id: Number(editingTaskId)});
          },
        });
    };

    return (
        <Modal 
            okText='确定' 
            cancelText='取消' 
            title='编辑任务' 
            onOk={onOk}
            onCancel={onCancel}
            confirmLoading={editLoading} 
            forceRender
            open={!!editingTaskId}>
            <Form {...layout} initialValues={editingTask} form={form}>
                <Form.Item label='任务名' name='name' rules={[{required: true, message: '请输入任务名',}]}>
                    <Input />
                </Form.Item>
                <Form.Item label='经办人 ' name='processorId'>
                    <UseSelect defaultOptionName="经办人" />
                </Form.Item>
                <Form.Item label='类型' name='typeId'>
                    <TaskTypeSelect />
                </Form.Item>
            </Form>
            <div style={{textAlign: 'right'}}>
                <Button size="small" type="link" style={{fontSize: '14px'}} onClick={confirmDeleteTask}>删除</Button>
            </div>
        </Modal>
    );
};
