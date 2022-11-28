import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib"
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screen/kanban/utils";
import { useTasks } from "screen/utils";
import { Epics } from "types/epic";
import { useEpicsQueryKey, useEpicsSearchParams } from "./config";
import { CreateEpic } from "./create-epic";
import { useDeleteEpics, useEpics } from "./utils";

export const EpicScreen = () => {
    const { data: currentProject } = useProjectInUrl();
    const { data: epics } = useEpics(useEpicsSearchParams());
    const { data: tasks } = useTasks({projectId: currentProject?.id})
    const { mutate: deleteEpic } = useDeleteEpics(useEpicsQueryKey());
    const [ epicCreateOpen, setEpicCreateOpen] = useState(false);

    const confirmDeleteEpic = (epic: Epics) => {
        Modal.confirm({
          title: '确定删除任务组吗？',
          content: '点击确定删除',
          okText: '确定', 
          cancelText: '取消', 
          onOk() {
            deleteEpic({id: epic.id});
          },
        });
      };

    return <ScreenContainer> 
        <Row between>
            <h1>{currentProject?.name}任务组</h1>
            <Button onClick={() => {setEpicCreateOpen(true)}}>创建任务组</Button>
        </Row>
        <List style={{overflow: 'scroll'}} dataSource={epics} itemLayout='vertical' renderItem={epic => <List.Item>
            <List.Item.Meta 
                title={<Row between>
                <span>{epic.name}</span>
                <Button type="link" onClick={() => confirmDeleteEpic(epic)}>删除</Button>
            </Row>}
            description={<div>
                <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
            </div>}
            />
            <div>
                {
                    tasks?.filter(task => task.epicId === epic.id).map(task => <Link 
                        to={`projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`} key={task.id}>
                        {task.name}
                    </Link>) 
                }
            </div>
        </List.Item>} /> 
        <CreateEpic visible={epicCreateOpen} onClose={() => {setEpicCreateOpen(false)}}/>
    </ScreenContainer>
};
