import { useCallback } from 'react';
import {
  Edit,
  SimpleForm,
  useRedirect,
  useNotify,
  useUpdate,
  DateField,
  TextField,
  Labeled,
  ArrayField,
  useRecordContext,
  Datagrid,
  SelectInput,
  ImageField
} from 'react-admin';
import EditToolbarWithConfirmation from '../components/edit-toolbar-with-confirmation';
import { Grid } from '@mui/material';
import Status from './status-enum';

export const InventoryCountEdit = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save = useCallback(
    async (values) => {
      try {
        const editedInventoryCount = await update(
          'inventory-counts',
          { id: values.id, data: values },
          { returnPromise: true }
        );
        notify('ra.notification.updated', {
          type: 'info',
          messageArgs: { smart_count: 1 },
        });
        redirect('list', 'inventory-counts', editedInventoryCount.id);
      } catch (error) {
        return notify('Error saving data', {
          type: 'error',
        });
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit title="Edit Inventory Count">
      <SimpleForm
        toolbar={
          <EditToolbarWithConfirmation
            title="Edit Inventory Count"
            content="Are you sure you want to edit this item?"
            save={save}
          />
        }
      >
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={12} sm={12} md={6}>
            <Labeled>
              <DateField label="Date" source="documentDate" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Labeled>
              <TextField label="User" source="User.username" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Items />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <StatusField />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

const Items = () => {
  return (
    <>
      <ArrayField source="InventoryCountItems">
        <Datagrid bulkActionButtons={false} sx={{ margin: '2em 0' }}>
          <TextField label="Product" source="Product.name" />
          <TextField source="currentQty" />
          <TextField source="realQty" />
          <TextField source="difference" />
        </Datagrid>
      </ArrayField>
    </>
  );
};

const StatusField = () => {
  const record = useRecordContext();

  if (record.status === Status.Canceled) {
    return (
      <Labeled>
        <TextField label="Status" source="status" />
      </Labeled>
    );
  }

  return (
    <SelectInput
      required
      fullWidth
      label="Status"
      source="status"
      optionValue="name"
      choices={[
        { id: Status.Completed, name: Status.Completed },
        { id: Status.Canceled, name: Status.Canceled },
      ]}
    />
  );
};
