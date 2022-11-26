import { useDebounce } from "hooks";
import { useProject } from "logichooks/useProject";
import { useQueryParam } from "logichooks/useQueryParam";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router"
import { useTask } from "screen/utils";

export const useProjectIdUrl = () => {
    const {pathname} = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdUrl());

export const useKanbansSearchParams = () => ({projectId: useProjectIdUrl()});

export const useKanbansQueryKey = () => ['kanbans', useKanbansSearchParams()];

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]; // useTasksSearchParams 记得加 ()

export const useTasksSearchParams = () => {
    const [param, setParam] = useQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ]);
    const projectId = useProjectIdUrl();
    const debounceName = useDebounce(param.name, 200);
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: debounceName || undefined,
    }), [projectId, param]);
};

export const useTaskModal = () => {
    const [{editingTaskId}, setEditingTaskId] = useQueryParam(['editingTaskId']);

    const {data: editingTask, isLoading} = useTask(Number(editingTaskId));
    const startEdit = useCallback((id: number) => {
        setEditingTaskId({editingTaskId: id})
    }, [setEditingTaskId]);
    const close = useCallback(() => {
        setEditingTaskId({editingTaskId: ''})
    }, [setEditingTaskId]);

    return {
        editingTask,
        editingTaskId,
        close,
        startEdit,
        isLoading,
    };
};
