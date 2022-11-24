import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import Pin from "components/pin";
import dayjs from "dayjs";
import { useEditProject } from "logichooks/useEditProject";
import { Link } from "react-router-dom";
import { Project } from "types/project";
import { User } from "./search-panel";
import {useProjectModal} from "./utils";

// export interface Project {
//   id: number;
//   name: string;
//   personId: number;
//   pin: boolean;
//   organization: string;
//   created: number;
// }

interface ListProps extends TableProps<Project> {
  users: User[];
}
const List = ({ users, ...props }: ListProps) => {
  const {mutate} = useEditProject();
  const {startEdit} = useProjectModal();

  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}); // 柯里化 refresh : 刷新列表
  const editProject = (id: number) => () => startEdit(id);

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
                <Menu.Item key={'edit'} onClick={editProject(project.id)}>编辑</Menu.Item>
                <Menu.Item key={'delete'}>删除</Menu.Item>
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
