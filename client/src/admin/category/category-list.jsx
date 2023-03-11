import { Datagrid, List, TextField, TextInput } from 'react-admin';

const categoryFilters = [
    <TextInput source="name" label="Search" alwaysOn />,
];

export const CategoryList = () => (
    <List filters={categoryFilters} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <TextField source="name" />
        </Datagrid>
    </List>
);
