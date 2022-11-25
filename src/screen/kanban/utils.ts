import { useProject } from "logichooks/useProject";
import { useQueryParam } from "logichooks/useQueryParam";
import { useMemo } from "react";
import { useLocation } from "react-router"

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
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name || undefined,
    }), [projectId, param]);
};
