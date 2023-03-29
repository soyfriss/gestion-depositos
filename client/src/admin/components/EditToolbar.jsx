import { Toolbar, SaveButton } from "react-admin";

// Custom toolbar without <DeleteButton>
const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

export default EditToolbar;
