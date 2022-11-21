import { useEffect } from "react";

import { Project } from "screen/project-list/list";
import { User } from "screen/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import useSync from "./useSync";

const useUser = (param?: Partial<Project>) => {
    const client = useHttp();
    const {run, ...result} = useSync<User[]>();

    useEffect(() => {
        run(client('users', {data: cleanObject(param || {})}))
      }, [client, param, run]);

    return result;
};

export default useUser;
