import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useKanbans, useTasks } from "screen/utils";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import { useKanbansSearchParams, useProjectInUrl, useTasksSearchParams } from "./utils";

export const KanbanScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbansSearchParams());
  const {isLoading: taskIsLoading } = useTasks(useTasksSearchParams());

  const isLoading = taskIsLoading || kanbanIsLoading;
  return ( 
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
        {
          isLoading ? <Spin size="large"/> : <ColumnContainer>
            {kanbans?.map((kanban) => (
              <KanbanColumn kanban={kanban} key={kanban.id} />
            ))}
            <CreateKanban />
          </ColumnContainer>
        }
        <TaskModal />
    </ScreenContainer>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
