import { useMutation, useQueryClient } from "react-query";
import { Project } from "types/project";
import { useProjectSearchParam } from "screen/project-list/utils";
import { useHttp } from "utils/http";

const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  // 报错 暂留
  // const [searchParams] = useProjectSearchParam();
  // console.log('searchParams', searchParams);
  
  // const queryKey = ["projects", searchParams];

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
    {
      // 接口调用成功时 刷新列表接口
      onSuccess: () => queryClient.invalidateQueries('projects'),
      // async onMutate(target) {
      //   // 回滚的数据
      //   const previousItems = queryClient.getQueryData(queryKey);
      //   queryClient.setQueryData(queryKey, (old?: Project[]) => {// 设置要更新的缓存
      //     return old?.map((project) =>
      //       project.id === target.id ? { ...project, ...target } : project
      //     ) || []; // 为什么这里加了[]  ，参数那 (old?: Project[]) 就不报错了
      //   });
      //   return { previousItems };
      // },
      // 发生错误时 回滚
      // onError(error, newItem, context) {
      //   queryClient.setQueryData(
      //     queryKey,
      //     (context as { previousItems: Project[] })?.previousItems
      //   );
      // },
    }
  );
};

const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (param: Partial<Project>) =>
      client("projects", {
        data: param,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export { useEditProject, useAddProject };
