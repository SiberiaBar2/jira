import {Drawer} from "antd";
import {useProjectModal} from "./utils";

const ProjectsModal = () => {
    const {projectModalOpen, close} = useProjectModal();
    return (
        <Drawer title='setOpenProjectMOdal' width={'100%'} visible={projectModalOpen} onClose={() => close()}>
            <h1>setOpenProjectMOdal</h1>
        </Drawer>
    )
}

export default ProjectsModal;
