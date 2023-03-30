import {
    Datagrid,
    List,
    TextField,
    TextInput,
    SelectInput,
} from "react-admin";

const userFilters = [
    <TextInput source="userName" label="Username" alwaysOn />,
    <SelectInput source="status" label="Status" choices={[
        { id: "Active", name: "Active" },
        { id: "Disabled", name: "Disabled" }
    ]} alwaysOn />,
]

export const UserList = () => (
    <List filters={userFilters} sort={{ field: 'username', order: 'ASC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <TextField source="username" />
            <TextField source="role" />
            <TextField source="status" />
        </Datagrid>
    </List>
)
