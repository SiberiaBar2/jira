import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddTask } from "screen/utils";
import { useProjectIdUrl, useTasksQueryKey } from "./utils";

export const CreateTasks = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdUrl();

  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toogle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toogle}>创建事务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toogle}
        placeholder="需要做些什么"
        autoFocus
        onPressEnter={submit}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </Card>
  );
};
