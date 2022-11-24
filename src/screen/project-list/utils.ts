import { useMemo } from "react";
import {useQueryParam, useSetUrlSearchParam} from "logichooks/useQueryParam";
import { useProject } from "logichooks/useProject";
import { useSearchParams } from "react-router-dom";

export const useProjectSearchParam = () => {
    const [param, setParam] = useQueryParam(['name', 'personId']);

    return [
        useMemo(
            () => ({...param, personId: Number(param.personId) || undefined}), 
            [param]
        ),
        setParam
    ] as const // as const 解决了使用时 变量和函数类型报错的问题
};

// 全局url状态管理器

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useQueryParam(['projectCreate']);
    const [{editingProjectId}, setEditingProjectId] = useQueryParam(['editingProjectId']);
    
    const setUrlParams = useSetUrlSearchParam();
    // 修改时的 projects-list 的一项
    const {data: editingProject, isLoading} = useProject(Number(editingProjectId));

    const open = () => {
        setProjectCreate({projectCreate: true});
    };
    const close = () => {
        // projectCreate === 'true'? setProjectCreate({projectCreate: undefined}):
        // setEditingProjectId({ editingProjectId: undefined});
        // setProjectCreate({projectCreate: undefined});
        // setEditingProjectId({ editingProjectId: undefined});

        setUrlParams({setUrlParams: '', editingProjectId: ''})
    };
    
    const startEdit = (id: number) => {
        setEditingProjectId({editingProjectId: id})
    };

    return {// 这里 useQueryParam 的第二个参数 （函数）会把 参数值 变 成一个字符串， 所以 为 'true'
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId), // 创建或编辑时 
        open, 
        close, 
        startEdit, 
        editingProject, 
        isLoading,
    };
};
