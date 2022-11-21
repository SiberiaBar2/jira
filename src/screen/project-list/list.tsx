import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import Pin from "components/pin";
import dayjs from "dayjs";
import { useEditProject } from "logichooks/useEditProject";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { projectListActions } from "./projects-list.slice";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}
const List = ({ users, ...props }: ListProps) => {
  const {mutate} = useEditProject();
  const dispatch = useDispatch();

  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh); // 柯里化 refresh : 刷新列表
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin check={true} disabled={true} />,
          render: (value, project) => <Pin check={project.pin} onCheckChange={pinProject(project.id)} />
        },
        {
          title: "名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // localeCompare 可排序中文字符
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render: (value, project) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render: (value, project) => {
            return (
              <Dropdown overlay={<Menu>
                <Menu.Item onClick={() => dispatch(projectListActions.openProjectModal())}>编辑</Menu.Item>
              </Menu>}>
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            )
          }
        }
      ]}
      {...props}
    />
  );
};
export default List;
