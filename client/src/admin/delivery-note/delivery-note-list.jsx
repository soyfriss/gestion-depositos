import {
    Datagrid,
    List,
    TextField,
    ReferenceInput,
    AutocompleteInput,
    DateInput,
    FunctionField,
    DateField,
    NumberInput,
    SelectInput
} from 'react-admin';

const deliveryNoteFilters = [
    <ReferenceInput source="employeeId" reference="employees" alwaysOn>
        <AutocompleteInput
            label="File number"
            filterToQuery={searchText => ({ fileNumber: searchText })}
        />
    </ReferenceInput>,
    // NOTE: If I add this filter, I have duplicate keys: employeeId!
    // <ReferenceInput source="employeeId" reference="employees" alwaysOn>
    //     <AutocompleteInput
    //         optionText="lastname"
    //         label="Employee"
    //         filterToQuery={searchText => ({ lastName: searchText })}
    //     />
    // </ReferenceInput>,
    <NumberInput source="documentNumber" alwaysOn />,
    <SelectInput source="status" label="Status" choices={[
        { id: "Created", name: "Created" },
        { id: "Processing", name: "Processing" },
        { id: "Canceled", name: "Canceled" },
        { id: "Completed", name: "Completed" },
    ]} alwaysOn />,
    <DateInput source="date_gte" label="Passed since" />,
    <DateInput source="date_lte" label="Passed before" />
];

export const DeliveryNoteList = () => (
    <List filters={deliveryNoteFilters} sort={{ field: 'documentDate', order: 'DESC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <DateField source="documentDate" />
            <TextField source="documentNumber" />
            <FunctionField
                label="Employee"
                sortBy="lastname"
                render={document => `${document.Employee.lastname}, ${document.Employee.firstname}`}
            />;
            <TextField source="status" />
        </Datagrid>
    </List>
);
