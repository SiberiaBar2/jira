import { Project } from "screen/project-list/list";
import { useHttp } from "utils/http";
import useSync from "./useSync";

const useEditProject = () => {
  // 解构剩余参数
  const { run, ...resultSync } = useSync();
  const client = useHttp();

  const mutate = (param: Partial<Project>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    resultSync,
  };
};

const useAddProject = () => {
  // 解构剩余参数
  const { run, ...resultSync } = useSync();
  const client = useHttp();

  const mutate = (param: Partial<Project>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: "POST", 
      })
    );
  };

  return {
    mutate,
    resultSync,
  };
};

export { useEditProject, useAddProject };
