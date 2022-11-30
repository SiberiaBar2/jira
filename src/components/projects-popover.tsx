import styled from "@emotion/styled";
import { Divider, List, Popover } from "antd"
import useProjects from "logichooks/useProjects";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "../screen/project-list/utils";
import { Text } from "./user-popover";
import { Title } from "authenticated-app";

export const ProjectsPopover = () => {
    const {open} = useProjectModal();
    const {data: projects, refetch} = useProjects();
    
    const pinnedProjects = projects?.filter(project => project.pin);
    
    const content = <ContentContainer>
        <Text>
            收藏项目
        </Text>
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

    // 显隐时重新调接口
    return <Popover onOpenChange={() => refetch()} placement="bottom" content={content}>
        <Title>项目</Title>
    </Popover>
};

const ContentContainer = styled.div`
    width: 30rem;
`
