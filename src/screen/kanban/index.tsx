import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { ScreenContainer } from "components/lib";
import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useKanbans, useReorderKanban, useReorderTask, useTasks } from "screen/utils";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbansQueryKey,
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./utils";

export const KanbanScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbansSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());

  const isLoading = taskIsLoading || kanbanIsLoading;

  const onDragEnd = useDragEnd();
  // onDragEnd 拖拽持久化的操作
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
            <Spin size="large" />
        ) : (
            <ColumnContainer>
                <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
                    <DropChild style={{ display: "flex" }}>
                        {kanbans?.map((kanban, index) => (
                            <Drag
                                key={kanban.id}
                                draggableId={"kanban" + kanban.id}
                                index={index}
                            >
                                <KanbanColumn kanban={kanban} key={kanban.id} />
                            </Drag>
                        ))}
                    </DropChild>
                </Drop>
            <CreateKanban />
            </ColumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

const useDragEnd = () => {
    const {mutate: reorderKanban} = useReorderKanban(useKanbansQueryKey());
    const {mutate: reorderTask} = useReorderTask(useTasksQueryKey());
    const {data: kanbans} = useKanbans(useKanbansSearchParams());
    const {data: allTasks = []} = useTasks(useTasksSearchParams());

    // 在 hook中返回的函数 都要用 useCallback 包裹起来
    return useCallback(({source, destination, type}: DropResult) => {
        
        if (!destination) {
            return;
        }
        if (type === 'COLUMN') {
            const fromId = kanbans?.[source.index].id;
            const toId = kanbans?.[destination.index].id;

            if (!fromId || !toId || fromId === toId) {
                return; 
            }

            const type = destination.index > source.index ? 'after': 'before';
            reorderKanban({fromId, referenceId: toId, type});
        }
        if (type === 'ROW') {
            console.log('source', source);
            console.log('destination', destination);
            
            const fromKanbanId = +source.droppableId;
            const toKanbanId = +destination.droppableId;

            // if (fromKanbanId === toKanbanId) {
            //   return;
            // }

            const fromTask = allTasks?.filter(task => task.kanbanId === fromKanbanId)[source.index];
            const toTask = allTasks?.filter(task => task.kanbanId === toKanbanId)[destination.index];

            if (fromTask?.id === toTask?.id){
                return;
            }

            reorderTask({
              fromId: fromTask?.id,
              referenceId: toTask?.id, 
              fromKanbanId,
              toKanbanId,
              type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after': 'before',
            });
        }
    },[allTasks, kanbans, reorderKanban, reorderTask])
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
