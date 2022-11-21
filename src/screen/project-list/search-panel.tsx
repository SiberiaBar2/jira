import { Form, Input } from "antd";
import { UseSelect } from "components/use-select";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  personId: string;
  organization: string;
  created: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, 'name'| 'personId'>>
  setParam: (param: any) => void;
}

const SearchPanel = (props: SearchPanelProps) => {
  const { users, param, setParam } = props;
    
  return (
    <Form style={{marginBottom: '2rem'}} layout={'inline'}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(event) => {
            setParam({
              ...param,
              name: event.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UseSelect 
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }} 
          defaultOptionName={'负责人'}
          />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
