import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd"
import useProjects from "logichooks/useProjects";
import { ButtonNoPadding } from "./lib";
import {useProjectModal, useProjectSearchParam} from "../screen/project-list/utils";

export const ProjectsPopover = () => {
    const {open} = useProjectModal();
    const {data: projects, isLoading} = useProjects();
    
    const pinnedProjects = projects?.filter(project => project.pin);
    
    const content = <ContentContainer>
        <Typography.Text>
            收藏项目
        </Typography.Text>
        <List>
        {
            pinnedProjects?.map(projects => <List.Item key={projects.id}>
                {<List.Item.Meta title={projects.name} />}
            </List.Item>)
        }
        </List>
        <Divider />
        <ButtonNoPadding type="link" onClick={open}>创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement="bottom" content={content}>
        <h2>项目</h2>
    </Popover>
};

const ContentContainer = styled.div`
    width: 30rem;
`
