import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { FullPageLoading, Row } from "components/lib";
import { Routes, Route } from "react-router";
import { ProjectScreen } from "screen/screen";
import { useAuth } from "context/auth-context";
import ProjectList from "screen/project-list";
import { BrowserRouter as Router } from "react-router-dom";
import { useMount } from "hooks";
import { useState } from "react";
import ProjectsModal from "screen/project-list/projects-modal";
import { ProjectsPopover } from "components/projects-popover";

export const AuthentIcateApp = () => {
  // const [openProjectModal, setOpenProjectMOdal] = useState(false);
  const { logout, user } = useAuth();


  useMount(() => {
    if (!window.location.pathname.includes("projects")) {
      window.location.pathname += "projects";
    }
  });

  const renderUser = () => {
    return (
      <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type={"link"} onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              hi {user?.name}
            </Button>
          </Dropdown>
    );
  };

  const renderPageHeader = () => {
    return (
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>JiraSoftWare</h2>
          <ProjectsPopover />
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          {renderUser()}
        </HeaderRight>
      </Header>
    ) ;
  };

  const renderBodyContent = () => {
    return  (
      <Container>
        {/* {value.notExact} */}
        {renderPageHeader()}
        {/* <Button onClick={() => setOpenProjectMOdal(true)}>dianji</Button> */}
        <Main>
          <Router>
            <Routes>
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            </Routes>
            {/* 不知为何 Navigate 不能放于  Routes 内部，也不能放于 Router 外部 */}
            {/* <Navigate to={'/projects'} /> */}
          </Router>
        </Main>
        <ProjectsModal />
      </Container>
    );
  };

  const renderWrapContent = () => {
    return window.location.pathname.includes('projects') ? renderBodyContent() : <FullPageLoading/>;
  };

  // const value: any = undefined;
  return <>
  {renderWrapContent()}
  </>;
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh -6rem);
`;
