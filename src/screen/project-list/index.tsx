import List from "./list";
import SearchPanel from "./search-panel";

import { useDebounce } from "hooks";
import styled from "@emotion/styled";
import { Button } from "antd";
import useProjects from "logichooks/useProjects";
import useUser from "logichooks/useUsers";
import useDocumentTitle from "logichooks/useDocumentTitle";
import {useProjectModal, useProjectSearchParam} from "./utils";
import { ErrorBox, Row } from "components/lib";

const ProjectList = () => {
    const {open} = useProjectModal();

  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParam();

  const debouncedParam = useDebounce(param, 500); // 对值进行debounce，只取最后结果

  const { isLoading, data: list } = useProjects(debouncedParam);
  const { data: users } = useUser();

  return (
    <Conteainer>
      <Row between={true}>
        <Title>项目列表</Title>
        <Button onClick={open}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox />
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Conteainer>
  );
};

export default ProjectList;

// ProjectList.whyDidYouRender = true;

const Conteainer = styled.div`
  padding: 3.2rem;
`;

const Title = styled.h1`
    color: rgb(160, 124, 207);
`