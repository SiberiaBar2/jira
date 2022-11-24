import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(['kanbans', param],() => client("kanbans", { data: param }));
};

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(['tasks', param],() => client("tasks", { data: param }));
};
