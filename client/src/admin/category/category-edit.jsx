import { useCallback } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    Toolbar,
    SaveButton,
    useRedirect,
    useNotify,
    useUpdate,
} from 'react-admin';
import { Box } from '@mui/material';

// Custom toolbar without <DeleteButton>
const PostEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

export const CategoryEdit = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();

    const save = useCallback(
        async values => {
            try {
                const updatedCategory = await update(
                    'categories',
                    { id: values.id, data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.updated', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect('list', 'categories', updatedCategory.id);
            } catch (error) {
                if (error.status === 400 && !error.body.validationError) {
                    return error.body;
                }

                if (error.status === 400 && error.body.validationError) {
                    return notify('Error validating data', {
                        type: 'error'
                    });
                }

                if (error.status === 500) {
                    return notify('Error saving data', {
                        type: 'error'
                    });
                }

                return notify('Unknow error', {
                    type: 'error'
                });
            }
        },
        [update, notify, redirect]
    );

    return (
        <Edit>
            <SimpleForm
                sx={{ maxWidth: 500 }}
                toolbar={<PostEditToolbar />}
                onSubmit={save}>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <TextInput source="name"
                        validate={required()}
                        fullWidth
                    />
                </Box>
            </SimpleForm>
        </Edit>
    );
}

