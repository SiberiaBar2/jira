import { useState } from "react";
// import * as qs from "qs";

import List from "./list";
import SearchPanel from "./search-panel";

import { useDebounce } from "hooks";
// import { cleanObject } from "utils";
// import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import useProjects from "logichooks/useProjects";
import useUser from "logichooks/useUsers";
import useDocumentTitle from "logichooks/useDocumentTitle";
import { useQueryParam } from "logichooks/useQueryParam";
import { useProjectSearchParam } from "./utils";
import useSync from "logichooks/useSync";
import { Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./projects-list.slice";

const ProjectList = () => {
  const dispatch = useDispatch();
  // const [users, setUsers] = useState([]);
  // const {retry} = useSync();

  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });

  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParam();
  // const [keys] = useState<('name' | 'personId')[]>(['name', 'personId']);
  // const [param, setParam] = useQueryParam(['name', 'personId']);

  // const perParam = {...param, personId: Number(param.personId)}

  // console.log('param', param);

  // setParam({name1: '123'})
  // const client = useHttp();

  const debouncedParam = useDebounce(param, 500); // 对值进行debounce，只取最后结果

  const { isLoading, data: list, error, retry } = useProjects(debouncedParam);
  const { data: users } = useUser();

  // useMount(() => {
  //   client('users').then(setUsers);
  // });

  return (
    <Conteainer>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>
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
