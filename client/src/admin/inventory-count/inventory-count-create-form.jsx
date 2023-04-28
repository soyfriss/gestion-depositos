import {
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  ReferenceInput,
  required,
  FormDataConsumer,
  TextField,
  useChoicesContext,
  useSimpleFormIteratorItem,
  Labeled
} from 'react-admin';
import { Grid } from '@mui/material';
import { useFormContext } from "react-hook-form";

export const InventoryCountCreateForm = () => {
  const { setValue } = useFormContext();

  const ProductInput = () => {
    const choicesContext = useChoicesContext();
    const item = useSimpleFormIteratorItem();

    const currentQtyField = `items.${item.index}.currentQty`;

    const getProductDetails = (id) => {
      if (id) {
        for (const product of choicesContext.allChoices) {
          if (product.id === id) {
            setValue(currentQtyField, product.currentQty);
            break;
          }
        }
      } else {
        setValue(currentQtyField, null);
      }
    }

    return <AutocompleteInput
      label="Product"
      validate={required()}
      filterToQuery={(searchText) => ({ name: searchText })}
      sx={{ flex: 2 }}
      onChange={(index) => getProductDetails(index)}
    />
  }

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
              fullWidth
            >
              <ReferenceInput
                source="productId"
                reference="products"
                queryOptions={{
                  meta: { moreFilters: { status: 'Active' } },
                }}
              >
                <ProductInput />
              </ReferenceInput>
              <NumberInput
                source="realQty"
                label="Real Qty"
                validate={required()}
                sx={{ flex: 1 }}
              />
              <FormDataConsumer>
                {({ scopedFormData }) => {
                  return <Labeled label="Current Qty" sx={{ mt: 1, mr: 1 }}>
                    <TextField
                      source="currentQty"
                      record={scopedFormData}
                    />
                  </Labeled>
                }}
              </FormDataConsumer>
              <FormDataConsumer>
                {({ scopedFormData }) => {
                  return <Labeled label="Difference" sx={{ mt: 1 }}>
                    <TextField
                      source="difference"
                      record={{ difference: scopedFormData.realQty - scopedFormData.currentQty }}
                    />
                  </Labeled>
                }}
              </FormDataConsumer>
            </SimpleFormIterator>
          </ArrayInput>
        </Grid>
      </Grid>
    </>
  );
};
