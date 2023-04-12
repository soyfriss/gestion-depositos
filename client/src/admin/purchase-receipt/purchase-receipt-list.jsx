import {
    Datagrid,
    List,
    TextField,
    ReferenceInput,
    AutocompleteInput,
    DateInput,
    DateField,
    NumberInput,
    SelectInput
} from 'react-admin';

const purchaseReceiptFilters = [
    <ReferenceInput source="supplierId" reference="suppliers" alwaysOn>
        <AutocompleteInput
            label="Name"
            filterToQuery={searchText => ({ name: searchText })}
        />
    </ReferenceInput>,
    <NumberInput source="documentNumber" alwaysOn />,
    <SelectInput source="status" label="Status" choices={[
        { id: "Canceled", name: "Canceled" },
        { id: "Completed", name: "Completed" },
    ]} alwaysOn />,
    <DateInput source="date_gte" label="Passed since" />,
    <DateInput source="date_lte" label="Passed before" />
];

export const PurchaseReceiptList = () => (
    <List filters={purchaseReceiptFilters} sort={{ field: 'documentDate', order: 'DESC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <DateField source="documentDate" />
            <TextField source="documentNumber" />
            <TextField label="Supplier" source="Supplier.name" />;
            <TextField source="status" />
        </Datagrid>
    </List>
);

