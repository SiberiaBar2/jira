import { Drawer } from "antd";

const ProjectsModal = (props: {openProjectModal: boolean, onClose: () => void}) => {
    return <Drawer title='setOpenProjectMOdal' width={'100%'} visible={props.openProjectModal} onClose={props.onClose}>
        <h1>setOpenProjectMOdal</h1>
    </Drawer>
}

export default ProjectsModal;
