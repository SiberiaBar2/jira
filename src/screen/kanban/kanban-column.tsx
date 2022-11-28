import Icon, {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Card, Dropdown, Menu, Modal } from "antd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { ButtonNoPadding, Row } from "components/lib";
import { Mark } from "components/mark";
import React, { forwardRef } from "react";

import { useDeleteKanban, useTasks } from "screen/utils";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { useTaskType } from "utils/task.type";
import { CreateTasks } from "./create-tasks";
import {
  useKanbansQueryKey,
  useTaskModal,
  useTasksSearchParams,
} from "./utils";

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

export const KanbanColumn = forwardRef<HTMLDivElement, { kanban: Kanban }>(
    ({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

    // 传入剩余 拖拽props 防止 属性丢失
    return (
      <Container ref={ref} {...props}>
        <Row between>
          <h3>{kanban.name}</h3>
          <More kanban={kanban} key={kanban.id} />
        </Row>
        <TasksContainer>
			<Drop type="ROW" direction="vertical" droppableId={String(kanban.id)}>
				<DropChild>
					{tasks?.map((task, taskIndex) => (
						<Drag key={task.id} index={taskIndex} draggableId={'task' + task.id}>
							{/* 用一个 html 自带的元素包裹；html 自带的元素包裹是可以接收ref的 这样就不用再用一个forwradref 转发ref了 */}
							{/* 这种是更简便的方法，但两种都应该掌握 */}
							<div>
								<TaskCard task={task} key={task.id} />
							</div>
						</Drag>
					))}
				</DropChild>
			</Drop>
			<CreateTasks kanbanId={kanban.id} />
        </TasksContainer>
      </Container>
    );
  }
);

const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
    const confirmDeleteKanban = () => {
            Modal.confirm({
            title: "确定删除看板吗?",
            content: "点击确定删除",
            okText: "确定",
            cancelText: "取消",
            onOk() {
                mutateAsync({ id: kanban.id });
            },
        });
    };

  return (
    <Dropdown
        overlay={
        <Menu>
          <Menu.Item key={"delete"} onClick={confirmDeleteKanban}>
            删除
          </Menu.Item>
        </Menu>
        }
    >
        <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
    );
};

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
