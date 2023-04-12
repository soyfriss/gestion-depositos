import { Datagrid, List, TextField, TextInput, SelectInput } from 'react-admin';

const supplierFilters = [
    <TextInput source="name" label="Name" alwaysOn />,
    <TextInput source="email" label="Email" alwaysOn />,
    <SelectInput source="status" label="Status" choices={[
        { id: "Active", name: "Active" },
        { id: "Disabled", name: "Disabled" }
    ]} alwaysOn />,
];

export const SupplierList = () => (
    <List filters={supplierFilters} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <TextField label="Name" source="name" />
            <TextField label="Email" source="email" />
            <TextField label="Phone" source="phone" />
            <TextField label="Status" source="status" />
        </Datagrid>
    </List>
);
