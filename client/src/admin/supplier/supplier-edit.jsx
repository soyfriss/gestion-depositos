import { useCallback } from 'react';
import { Edit, SimpleForm, Toolbar, SaveButton, useRedirect, useNotify, useUpdate } from 'react-admin';
import { SupplierForm } from './supplier-form';

// Custom toolbar without <DeleteButton>
const PostEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

export const SupplierEdit = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();

    const save = useCallback(
        async values => {
            try {
                const updatedSupplier = await update(
                    'suppliers',
                    { id: values.id, data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.updated', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect('list', 'suppliers', updatedSupplier.id);
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
                toolbar={<PostEditToolbar />}
                onSubmit={save}>
                <SupplierForm />
            </SimpleForm>
        </Edit>
    );
}
