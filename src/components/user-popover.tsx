import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd"
import useUser from "logichooks/useUsers";

export const UserPopover = () => {
    const {data: users, refetch} = useUser();
    
    const content = <ContentContainer>
        <Typography.Text>
            组员列表
        </Typography.Text>
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
        <h2>组员</h2>
    </Popover>
};

const ContentContainer = styled.div`
    width: 30rem;
`
