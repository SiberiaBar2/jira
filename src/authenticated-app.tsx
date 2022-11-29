import styled from "@emotion/styled";
import {Button, Dropdown, Menu} from "antd";
import {Row} from "components/lib";
import {Routes, Route, Navigate, useNavigate} from "react-router";
import {ProjectScreen} from "screen/screen";
import {useAuth} from "context/auth-context";
import ProjectList from "screen/project-list";
import {BrowserRouter as Router} from "react-router-dom";
import ProjectsModal from "screen/project-list/projects-modal";
import {ProjectsPopover} from "components/projects-popover";
import { UserPopover } from "components/user-popover";
import onthewind from "assets/on-the-wind.jpg";

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

    const PageHeader = () => {

        const naivigate = useNavigate();
        return (
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <Title onClick={() => naivigate('/projects')}>
                        JiraSoftWare
                    </Title>
                    <ProjectsPopover />
                    <UserPopover />
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
                <PageHeader />
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
  background-image: url(${onthewind});
  border-color: transparent;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: left bottom;
  z-index: 1;
  position: relative;
  ::after {
    position: absolute;
    left: 0;top: 0;
    bottom: 0;right: 0;
    content: '';
    background: url(${onthewind});
    background-size:cover ;
    z-index: -1;
    filter: blur(10px);
  }
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
  /* display: flex; */
  overflow: hidden;
`;

export const Title = styled.h2`
    cursor: pointer;
    color: rgb(160, 124, 207);
`
