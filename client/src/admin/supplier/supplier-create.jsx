import { useCallback } from 'react';
import { Create, SimpleForm, useRedirect, useNotify, useCreate } from 'react-admin';
import { SupplierForm } from './supplier-form';

export const SupplierCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();

    const save = useCallback(
        async values => {
            try {
                const createdSupplier = await create(
                    'suppliers',
                    { data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.created', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect('list', 'suppliers', createdSupplier.id);
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
            <SimpleForm onSubmit={save}>
                <SupplierForm />
            </SimpleForm>
        </Create>
    );
}