import styled from "@emotion/styled";
import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib"
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screen/kanban/utils";
import { TitleLarge } from "screen/project-list";
import { useTasks } from "screen/utils";
import { Epics } from "types/epic";
import { SpanContainer } from "unauthenticated";
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
            <TitleLarge>{currentProject?.name}任务组</TitleLarge>
            <Button onClick={() => {setEpicCreateOpen(true)}}>创建任务组</Button>
        </Row>
        <List style={{overflow: 'scroll'}} dataSource={epics} itemLayout='vertical' renderItem={epic => <List.Item>
            <List.Item.Meta 
                title={<Row between>
                <SpanContainer>{epic.name}</SpanContainer>
                <Button type="link" onClick={() => confirmDeleteEpic(epic)}>删除</Button>
            </Row>}
            description={<div>
                <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
            </div>}
            />
            <div>
                {/* projects 前没有加 / ，结果： 在原来路由基础上叠加了，无法起到真正的跳转效果 */}
                {
                    tasks?.filter(task => task.epicId === epic.id).map(task => <LinkContainer 
                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`} key={task.id}>
                        {task.name}
                    </LinkContainer>) 
                }
            </div>
        </List.Item>} /> 
        <CreateEpic open={epicCreateOpen} onClose={() => {setEpicCreateOpen(false)}}/>
    </ScreenContainer>
};

const LinkContainer = styled(Link)`
    margin-right: 0.5rem;
`