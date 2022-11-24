import styled from "@emotion/styled";
import {Button, Dropdown, Menu} from "antd";
import {Row} from "components/lib";
import {Routes, Route, Navigate} from "react-router";
import {ProjectScreen} from "screen/screen";
import {useAuth} from "context/auth-context";
import ProjectList from "screen/project-list";
import {BrowserRouter as Router} from "react-router-dom";
import ProjectsModal from "screen/project-list/projects-modal";
import {ProjectsPopover} from "components/projects-popover";

export const AuthentIcateApp = () => {
    const {logout, user} = useAuth();
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
        );
    };

    return (
        <Container>
            <Router>
                {renderPageHeader()}
                <Main>
                    <Routes>
                        <Route path="/projects" element={<ProjectList />}/>
                        <Route path="/projects/:projectId/*" element={<ProjectScreen/>}/>
                        {/* 这里不加 replace 会无法回退！*/}
                        <Route path="*" element={<Navigate to={'/projects '} replace />} />
                    </Routes>
                </Main>
                <ProjectsModal />
            </Router>
        </Container>
    );
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
  height: calc(100vh - 6rem);
  display: flex;
  overflow: hidden;
`;
