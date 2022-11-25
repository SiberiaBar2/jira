import { useEffect } from "react";

import { Project } from "types/project";
import { User } from "screen/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import useSync from "./useSync";

// 作用与使用 react-query 的 usequery 相同
const useUser = (param?: Partial<Project>) => {
    const client = useHttp();
    const {run, ...result} = useSync<User[]>();

    useEffect(() => {
        run(client('users', {data: cleanObject(param || {})}))
      }, [client, param, run]);

    return result;
};

export default useUser;
