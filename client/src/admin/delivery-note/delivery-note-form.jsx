import {
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  ReferenceInput,
  required,
  minValue,
  useInput
} from 'react-admin';
import { Grid, Box } from '@mui/material';
import Signature from '../components/signature';
import Typography from '@mui/material/Typography';
import { FormHelperText } from '@mui/material';
import TicketSelectDialog from '../components/ticket-select-dialog';

export const DeliveryNoteForm = ({ setSignatureCanvas, setTicket }) => {
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
          <TicketSelectDialog setTicket={setTicket} />
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
        <Grid item xs={12} sm={12} md={6} mt={2}>
          <SignatureInput source="employeeSign" setSignatureCanvas={setSignatureCanvas} />
        </Grid>
      </Grid>
    </>
  );
};

const SignatureInput = ({ source, setSignatureCanvas }) => {
  const { id, field, fieldState } = useInput({ source });
  return <>
    <Box>
      <Typography variant="caption" display="block" gutterBottom>
        <FormHelperText error={fieldState.error ? true : false}>
          Signature pad *
        </FormHelperText>
      </Typography>
    </Box>
    <Signature
      id={id}
      {...field}
      setSignatureCanvas={setSignatureCanvas}
    />
    <FormHelperText error>
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </FormHelperText>
  </>
}
