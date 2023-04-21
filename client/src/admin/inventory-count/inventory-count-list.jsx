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
    SelectInput,
    ReferenceField
} from 'react-admin';

const inventoryCountFilters = [
    <ReferenceInput source="userId" reference="users" alwaysOn>
        <AutocompleteInput
            label="User"
            filterToQuery={searchText => ({ name: searchText })}
        />
    </ReferenceInput>,
    <SelectInput source="status" label="Status" choices={[
        { id: "Canceled", name: "Canceled" },
        { id: "Completed", name: "Completed" },
    ]} alwaysOn />,
    <DateInput source="date_gte" label="Passed since" />,
    <DateInput source="date_lte" label="Passed before" />
];

export const InventoryCountList = () => (
    <List filters={inventoryCountFilters} sort={{ field: 'documentDate', order: 'DESC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <DateField source="documentDate" />
            <ReferenceField reference='users' source='userId'>
                <TextField source="username" />
            </ReferenceField>
            <TextField source="status" />
        </Datagrid>
    </List>
);
