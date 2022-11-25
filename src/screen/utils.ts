import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import {useAddConfig} from 'logichooks/use-optimistic';
 
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(['kanbans', param],() => client("kanbans", { data: param }));
};

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(['tasks', param],() => client("tasks", { data: param }));
};

export const useAddKanban  = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Kanban>) =>
      client("kanbans", {
        data: param,
        method: "POST",
    }),
    useAddConfig(queryKey)
  );
};

export const useAddTask  = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Kanban>) =>
      client("tasks", {
        data: param,
        method: "POST",
    }),
    useAddConfig(queryKey)
  );
};
