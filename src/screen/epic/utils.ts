import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epics } from "types/epic";
import { useAddConfig, useDeleteConfig } from 'logichooks/use-optimistic';
 
export const  useEpics = (param?: Partial<Epics>) => {
  const client = useHttp();
  return useQuery<Epics[]>(['epics', param],() => client("epics", { data: param }));
};

export const useAddEpics  = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Epics>) =>
      client("epics", {
        data: param,
        method: "POST",
    }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpics  = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}: {id: number}) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
      useDeleteConfig(queryKey)
  );
};
