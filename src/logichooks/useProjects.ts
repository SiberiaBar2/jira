import { useCallback, useEffect } from "react";

import useSync from "./useSync";
import { Project } from "screen/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";

const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useSync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [fetchProjects, param, run]);

  return result;
};

export default useProjects;
