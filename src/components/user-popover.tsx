import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd"
import { Title } from "authenticated-app";
import useUser from "logichooks/useUsers";

export const UserPopover = () => {
    const {data: users, refetch} = useUser();
    
    const content = <ContentContainer>
        <Text>
            组员列表
        </Text>
        <List>
        {
            users?.map(user => <List.Item key={user.id}>
                {<List.Item.Meta title={user.name} />}
            </List.Item>)
        }
        </List>
        <Divider />
    </ContentContainer>

    return <Popover onVisibleChange={() => refetch()} placement="bottom" content={content}>
        <Title>组员</Title>
    </Popover>
};

const ContentContainer = styled.div`
    width: 30rem;
`

export const Text = styled(Typography.Text)`
    color: rgb(160, 124, 207);
`
