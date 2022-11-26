import Icon, {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Card, Dropdown, Menu, Modal } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { Mark } from "components/mark";

import { useDeleteKanban, useTasks } from "screen/utils";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { useTaskType } from "utils/task.type";
import { CreateTasks } from "./create-tasks";
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./utils";

type IconType = React.ForwardRefExoticComponent<any>;

const TaskIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskType();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return name === "task" ? (
    <IconContainer
      component={CheckCircleOutlined as IconType}
      style={{ color: "#52c41a" }}
    />
  ) : (
    <IconContainer
      component={CloseCircleOutlined as IconType}
      style={{ color: "#eb2f96" }}
    />
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParams();
  
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark name={task.name} keyword={keyword || ""} />
      </p>
      <TaskIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban }/>
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTasks kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

const More = ({kanban}: {kanban: Kanban}) => {
    const {mutateAsync} = useDeleteKanban(useKanbansQueryKey());
    const confirmDeleteKanban = () => {
        Modal.confirm({
          title: '确定删除看板吗?',
          content: '点击确定删除',
          okText: '确定',
          cancelText: '取消', 
          onOk() { 
            mutateAsync({id: kanban.id});
          },
        });
      };

    return (
        <Dropdown overlay={
            <Menu> 
                <Menu.Item key={'delete'} onClick={confirmDeleteKanban}>
                    删除
                </Menu.Item>
            </Menu>}>
            <ButtonNoPadding type="link">...</ButtonNoPadding>
        </Dropdown>
    )
}

const IconContainer = styled(Icon)`
  /* width: 2rem;
    height: 2rem; */
  /* text-align: center; */
`;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
