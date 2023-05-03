import {
    Datagrid,
    List,
    TextField,
    TextInput,
    SelectInput,
    NumberField,
    ImageField,
    ArrayField,
    SingleFieldList,
    ChipField,
    ReferenceArrayInput,
    DateField,
} from "react-admin";

const PhotosPanel = () => {
    return (
        <ImageField
            source="ProductPhotos"
            src="src"
            sx={{ '& .RaImageField-image': { width: '20em', height: '20em', objectFit: 'contain' } }}
        />
    );
};

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
        <Datagrid rowClick="edit" bulkActionButtons={false} expand={<PhotosPanel />}>
            <TextField source="name" />
            <NumberField source="currentQty" label="Current Qty" />
            <DateField source="lastQtyCountDate" label="Last Qty Count" align="right" />
            <ArrayField source="Categories" sortable={false}>
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <TextField source="status" />
        </Datagrid>
    </List>
)
