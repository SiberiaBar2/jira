import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-types-select";
import { UseSelect } from "components/use-select";
import { useSetUrlSearchParam } from "logichooks/useQueryParam";
import { useTasksSearchParams } from "./utils";

export const SearchPanel = () => {
  const seachParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder="人物名"
        value={seachParams.name}
        onChange={(event) => setSearchParams({ name: event.target.value })}
      />
      <UseSelect
        defaultOptionName="经办人"
        value={seachParams.processorId}
        onChange={(value) => setSearchParams({ processorId:  value })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={seachParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
 