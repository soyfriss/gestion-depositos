import {
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  ReferenceInput,
  required,
  minValue,
} from 'react-admin';
import { Grid } from '@mui/material';

export const PurchaseReceiptForm = () => {
  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12} sm={12} md={4}>
          <DateInput
            required
            fullWidth
            label="Date"
            defaultValue={new Date()}
            source="documentDate"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <ReferenceInput fullWidth source="supplierId" reference="suppliers">
            <AutocompleteInput
              label="Supplier"
              validate={required()}
              filterToQuery={(searchText) => ({ name: searchText })}
              optionText="name"
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <NumberInput
            required
            fullWidth
            label="Document Number"
            source="documentNumber"
          />
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
              <NumberInput
                source="quantity"
                validate={[required(), minValue(1)]}
                defaultValue={1}
                sx={{ flex: 1 }}
              />
            </SimpleFormIterator>
          </ArrayInput>
        </Grid>
      </Grid >
    </>
  );
};
