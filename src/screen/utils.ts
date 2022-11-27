import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import {useAddConfig, useDeleteConfig, useEditConfig, useReorder} from 'logichooks/use-optimistic';
 
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

export const useDeleteKanban  = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}: {id: number}) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
      useDeleteConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(
    ["tasks", { id }], 
    () => client(`tasks/${id}`), 
    {
        enabled: !!id,
    });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Task>) =>
      client(`tasks/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
      useEditConfig(queryKey),
  );
};
 
export const useDeleteTask  = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}: {id: number}) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
      useDeleteConfig(queryKey)
  );
};

export interface SortProp {
  fromId: number // 要重新排序的item
  referenceId: number // 目标item
  type: 'before' | 'after' //  房子目标item的前还是后 
  fromKanbanId?: number
  toKanbanId?: number
} 

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProp) => 
      client('kanbans/reorder', {
        data: params,
        method: 'POST'
      }),
    useReorder(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey)  => {
  const client = useHttp();
  return useMutation(
    (params: SortProp) => 
      client('tasks/reorder', {
        data: params,
        method: 'POST'
      }),
    useReorder(queryKey)
  );
};
