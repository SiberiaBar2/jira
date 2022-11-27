import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { TaskType } from "types/task-type";

export const useTaskType = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(['tasksTypes'],() => client("taskTypes"));
};
