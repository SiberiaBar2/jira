import { useQuery } from "react-query";
import { Project } from "types/project";
import { useHttp } from "utils/http";

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }], 
    () => client(`projects/${id}`), 
    {
        enabled: !!id, // 当id 为undefined 时 即使变化 也不刷新  ; !!id === Boolean(id)
    });
};
