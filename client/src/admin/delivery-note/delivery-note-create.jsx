import { useCallback, useState } from 'react';
import {
    Create,
    SimpleForm,
    useRedirect,
    useNotify,
    useCreate,
} from 'react-admin';
import { DeliveryNoteForm } from './delivery-note-form';
import Status from './status-enum';

export const DeliveryNoteCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();
    const [signatureCanvas, setSignatureCanvas] = useState('');

    const save = useCallback(
        async values => {
            try {
                // console.log('form values: ', values);
                // console.log('signature: ', signatureCanvas);
                values.status = Status.Completed;
                values.employeeSign = signatureCanvas
                const createdDeliveryNote = await create(
                    'delivery-notes',
                    { data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.created', {
                    type: 'info',
                    messageArgs: { smart_count: 1 }
                });
                redirect('list', 'delivery-notes', createdDeliveryNote.id);
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
        [create, notify, redirect, signatureCanvas]
    );

    return (
        <Create>
            <SimpleForm onSubmit={save}>
                <DeliveryNoteForm setSignatureCanvas={setSignatureCanvas} />
            </SimpleForm>
        </Create>
    );
}

