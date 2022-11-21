import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, projectListState } from "./projects-list.slice";

const ProjectsModal = () => {

    const {projectModalOpen} = useSelector(projectListState);
    const dispatch = useDispatch()
    return <Drawer title='setOpenProjectMOdal' width={'100%'} visible={projectModalOpen} onClose={() => dispatch(projectListActions.closeProjectModal())}>
        <h1>setOpenProjectMOdal</h1>
    </Drawer>
}

export default ProjectsModal;
