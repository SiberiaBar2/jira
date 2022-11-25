import { Link, Navigate } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router";
import { EpicScreen } from "screen/epic";
import { KanbanScreen } from "screen/kanban";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
}

export const ProjectScreen = () => {
  const routeType = useRouteType();
  
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={"epic"}>任务组 </Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="/kanban" element={<KanbanScreen />} />
          <Route path="/epic" element={<EpicScreen />} />
          <Route
            path="*"
            element={
              <Navigate to={window.location.pathname + "/kanban "} replace />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
  height: 100%;
`;
const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden; // 为什么加了这个属性 看板就能横向滚动了？
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100%;
  /* overflow: hidden; */
`;
