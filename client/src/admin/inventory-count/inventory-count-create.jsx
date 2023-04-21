import { useCallback } from 'react';
import {
    Create,
    SimpleForm,
    useRedirect,
    useNotify,
    useCreate,
} from 'react-admin';
import { InventoryCountCreateForm } from './inventory-count-create-form';
import Status from './status-enum';

export const InventoryCountCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();

    const save = useCallback(
        async values => {
            try {
                values.status = Status.Completed;
                const createdInventoryCount = await create(
                    'inventory-counts',
                    { data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.created', {
                    type: 'info',
                    messageArgs: { smart_count: 1 }
                });
                redirect('list', 'inventory-counts', createdInventoryCount.id);
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
                <InventoryCountCreateForm />
            </SimpleForm>
        </Create>
    );
}
