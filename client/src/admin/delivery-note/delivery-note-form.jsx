import { useState } from 'react';
import {
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  ReferenceInput,
  required,
  minValue,
  Labeled,
} from 'react-admin';
import { Grid, Button, Box } from '@mui/material';
import Signature from '../components/signature';

export const DeliveryNoteForm = () => {
  const [signature, setSignature] = useState(null);

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
          <ReferenceInput fullWidth source="employeeId" reference="employees">
            <AutocompleteInput
              label="File number"
              validate={required()}
              filterToQuery={(searchText) => ({ fileNumber: searchText })}
              optionText="fullName"
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
                  meta: { moreFilters: { status: 'Active', stock_gte: 1 } },
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
        <Grid item xs={12} sm={12} md={12} mt={2}>
          <Box>
            <span>Signature pad</span>
          </Box>
          <Signature saveSignature={setSignature} />
          {signature ? (
            <Labeled label="Signature saved">
              <img
                src={signature}
                alt="signature"
                style={{
                  display: 'block',
                  // border: '1px solid black',
                  width: '150px',
                  marginTop: '1em',
                }}
              />
            </Labeled>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};
