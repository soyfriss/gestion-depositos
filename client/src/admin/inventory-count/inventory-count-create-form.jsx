import {
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  ReferenceInput,
  required,
  FormDataConsumer,
  TextInput,
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
          <ArrayInput source="items" validate={required()}>
            <SimpleFormIterator
              inline
              getItemLabel={(index) => `#${index + 1}`}
              fullWidth
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
              <NumberInput
                source="realQty"
                label="Real Qty"
                validate={required()}
                sx={{ flex: 1 }}
              />
              <FormDataConsumer>
                {({ scopedFormData, getSource }) => {
                  const { productId } = scopedFormData;
                  if (productId) {
                    return <CurrentQtyField
                      scopedFormData={scopedFormData}
                      productId={scopedFormData.productId}
                      getSource={getSource}
                    />
                  } else {
                    return (
                      <TextInput
                        disabled
                        label="Current Qty"
                        source={getSource('currentQty')}
                        sx={{ flex: 1 }}
                      />
                    )
                  }
                }}
              </FormDataConsumer>
              <FormDataConsumer>
                {({ scopedFormData, getSource }) => {
                  console.log('scopedFormData difference', scopedFormData);
                  if (isNaN(scopedFormData.realQty) || isNaN(scopedFormData.currentQty)) {
                    scopedFormData.difference = '';
                  } else {
                    scopedFormData.difference = scopedFormData.realQty - scopedFormData.currentQty;
                  }
                  return (
                    <NumberInput
                      disabled
                      label="Difference"
                      defaultValue={scopedFormData.difference}
                      source={getSource('difference')}
                      sx={{ flex: 1 }}
                    />
                  )
                }}
              </FormDataConsumer>
            </SimpleFormIterator>
          </ArrayInput>
        </Grid>
      </Grid>
    </>
  );
};

const CurrentQtyField = ({ scopedFormData, getSource, productId }) => {
  const { data: product, isLoading, error } = useGetOne('products', { id: productId });

  if (isLoading) { return <Loading />; }

  if (error) { return <p>ERROR</p>; }

  scopedFormData.currentQty = product.currentQty;
  if (isNaN(scopedFormData.realQty)) {
    scopedFormData.difference = -product.currentQty;
  } else {
    scopedFormData.difference = scopedFormData.realQty - product.currentQty
  }

  return (
    <TextInput
      disabled
      defaultValue={scopedFormData.currentQty}
      label="Current Qty"
      source={getSource('currentQty')}
    />
  )
}
