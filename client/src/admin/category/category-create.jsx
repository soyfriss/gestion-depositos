import { useCallback } from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    useRedirect,
    useNotify,
    useCreate,
} from 'react-admin';
import { Box } from '@mui/material';

export const CategoryCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();

    const save = useCallback(
        async values => {
            try {
                const createdCategory = await create(
                    'categories',
                    { data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.created', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect('list', 'categories', createdCategory.id);
            } catch (error) {
                if (error.status === 400 && !error.body.validationError) {
                    return error.body;
                }

                if (error.status === 400 && error.body.validationError) {
                    return notify('Error validating data', {
                        type: 'error'
                    });
                }

                return notify('Unknow error', {
                    type: 'error'
                });
            }
        },
        [create, notify, redirect]
    );

    return (
        <Create>
            <SimpleForm sx={{ maxWidth: 500 }} onSubmit={save}>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <TextInput source="name"
                        validate={required()}
                        fullWidth
                    />
                </Box>
            </SimpleForm>
        </Create>
    );
}
