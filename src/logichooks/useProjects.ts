
import { Project } from "types/project";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";

// react query 最擅长获取列表数据
const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // useQuery 第一个参数可以为字符串 也可为数组 数组第二个参数如果变化 useQuery就会重新调用
  return useQuery<Project[]>(['projects', param],() => client("projects", { data: param }));
};

export default useProjects;
