import { Datagrid, List, TextField, TextInput, FunctionField } from 'react-admin';

const employeeFilters = [
    <TextInput source="lastName" label="Last name" alwaysOn />,
    <TextInput source="fileNumber" label="File number" alwaysOn />,
    <TextInput source="firstName" label="First name"  />,
    <TextInput source="email" label="Email"  />,
];

export const EmployeeList = () => (
    <List filters={employeeFilters} sort={{ field: 'lastname', order: 'ASC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <FunctionField label="Last name & First name" render={employee => `${employee.lastname}, ${employee.firstname}`} />;
            <TextField label="Email" source="email" />
            <TextField label="Phone" source="phone" />
            <TextField label="File Number" source="filenumber" />
        </Datagrid>
    </List>
);
