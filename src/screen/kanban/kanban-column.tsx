import Icon, {
    CheckCircleOutlined,
    CloseCircleOutlined,
  } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Card } from "antd";

import { useTasks } from "screen/utils";
import { Kanban } from "types/kanban";
import { useTaskType } from "utils/task.type";
import { CreateTasks } from './create-tasks';
import { useTasksSearchParams } from "./utils";

type IconType = React.ForwardRefExoticComponent<any>;

const TaskIcon = ({id}: {id: number}) => {
    const {data: taskTypes} = useTaskType();
    const name = taskTypes?.find(taskType => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return  (
        name === 'task' 
        ? <IconContainer component={CheckCircleOutlined as IconType}  style={{color: "#52c41a"}}/> 
        : <IconContainer component={CloseCircleOutlined as IconType} style={{color: "#eb2f96"}} />
    )

};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
    <h3>{kanban.name}</h3>
        <TasksContainer>
            {tasks?.map((task) => {
                return (
                    <Card style={{marginBottom: '0.5rem'}} key={task.id}>
                        <div>{task.name}</div>
                        <TaskIcon id={task.typeId}/>
                    </Card>
                );
            })}
            <CreateTasks kanbanId={kanban.id} />
        </TasksContainer>
    </Container>
  );
};

const IconContainer = styled(Icon)`
    /* width: 2rem;
    height: 2rem; */
    /* text-align: center; */
`

export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem; 
`

const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;

    ::-webkit-scrollbar {
        display: none;
    }
`
