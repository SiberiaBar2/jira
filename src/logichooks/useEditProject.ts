import { QueryKey, useMutation } from "react-query";
import { Project } from "types/project";
import { useHttp } from "utils/http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic";

const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // 报错 暂留
  // const [searchParams] = useProjectSearchParam();

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
      useEditConfig(queryKey),
  );
};

const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Project>) =>
      client("projects", {
        data: param,
        method: "POST",
      }),
      useAddConfig(queryKey)
  );
};

const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}: {id: number}) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
      useDeleteConfig(queryKey)
  );
};

export { useEditProject, useAddProject, useDeleteProject };
