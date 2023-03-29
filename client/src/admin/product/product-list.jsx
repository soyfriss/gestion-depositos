import {
    Datagrid,
    List,
    TextField,
    TextInput,
    SelectInput,
    NumberField,
    ArrayField,
    SingleFieldList,
    ChipField,
    ReferenceArrayInput,
} from "react-admin";

const productFilters = [
    <TextInput source="name" label="Search" alwaysOn />,
    <ReferenceArrayInput source="categories" reference="categories" alwaysOn />,
    <SelectInput source="status" label="Status" choices={[
        { id: "Active", name: "Active" },
        { id: "Disabled", name: "Disabled" }
    ]} alwaysOn />,
]

export const ProductList = () => (
    <List filters={productFilters} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <TextField source="name" />
            <NumberField source="stock" />
            <ArrayField source="Categories" sortable={false}>
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <TextField source="status" />
        </Datagrid>
    </List>
)
