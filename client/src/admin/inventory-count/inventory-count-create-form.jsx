import {
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  ReferenceInput,
  required,
  FormDataConsumer,
  Labeled,
  TextField,
  useGetOne,
  Loading
} from 'react-admin';
import { Grid } from '@mui/material';

export const InventoryCountCreateForm = () => {
  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12} sm={12} md={6}>
          <DateInput
            required
            fullWidth
            label="Date"
            defaultValue={new Date()}
            source="documentDate"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ReferenceInput fullWidth source="userId" reference="users">
            <AutocompleteInput
              label="User"
              validate={required()}
              filterToQuery={(searchText) => ({ username: searchText })}
              optionText="username"
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ArrayInput source="items">
            <SimpleFormIterator
              inline
              getItemLabel={(index) => `#${index + 1}`}
              sx={{ '& .RaSimpleFormIterator-form': { flex: 1 } }}
            >
              <ReferenceInput
                source="productId"
                reference="products"
                queryOptions={{
                  meta: { moreFilters: { status: 'Active' } },
                }}
              >
                <AutocompleteInput
                  label="Product"
                  validate={required()}
                  filterToQuery={(searchText) => ({ name: searchText })}
                  sx={{ flex: 2 }}
                />
              </ReferenceInput>
              <FormDataConsumer>
                {({ scopedFormData }) => {
                  const { productId } = scopedFormData;
                  if (productId) {
                    return <ProductCurrentQty productId={scopedFormData.productId} />
                  }
                  return <Labeled label="Current Qty">
                    <TextField source="currentQty" defaultValue="-" />
                  </Labeled>
                }}
              </FormDataConsumer>
              <NumberInput
                source="realQty"
                label="Real Qty"
                validate={required()}
                sx={{ flex: 1 }}
              />
            </SimpleFormIterator>
          </ArrayInput>
        </Grid>
      </Grid>
    </>
  );
};

const ProductCurrentQty = ({ productId }) => {
  const { data: product, isLoading, error } = useGetOne('products', { id: productId });
  console.log('product', product);

  if (isLoading) { return <Loading />; }

  if (error) { return <p>ERROR</p>; }

  return <>
    <Labeled label="Current Qty">
      <TextField source="currentQty" record={product} />
    </Labeled>
  </>
}
