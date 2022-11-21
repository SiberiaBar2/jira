import List from "./list";
import SearchPanel from "./search-panel";

import { useDebounce } from "hooks";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import useProjects from "logichooks/useProjects";
import useUser from "logichooks/useUsers";
import useDocumentTitle from "logichooks/useDocumentTitle";
import {useProjectModal, useProjectSearchParam} from "./utils";
import { Row } from "components/lib";

const ProjectList = () => {
    const {open} = useProjectModal();

  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParam();

  const debouncedParam = useDebounce(param, 500); // 对值进行debounce，只取最后结果

  const { isLoading, data: list, error, retry } = useProjects(debouncedParam);
  const { data: users } = useUser();

  return (
    <Conteainer>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => open()}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Conteainer>
  );
};

export default ProjectList;

ProjectList.whyDidYouRender = true;

const Conteainer = styled.div`
  padding: 3.2rem;
`;
