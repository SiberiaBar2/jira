import { Project } from "types/project";
import { User } from "screen/project-list/search-panel";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";

const useUser = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery<User[]>(['users'], () => client('users', {data: param}));
};

export default useUser;
