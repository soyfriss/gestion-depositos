import { useCallback } from 'react';
import { Edit, SimpleForm, useRedirect, useNotify, useUpdate } from 'react-admin';
import EditToolbar from '../components/EditToolbar';
import { UserForm } from './user-form';

export const UserEdit = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();

    const save = useCallback(
        async values => {
            try {
                if (values.passwordEdit !== undefined) {
                    values.password = values.passwordEdit;
                } else {
                    delete values.password;
                }
                const editedUser = await update(
                    'users',
                    { id: values.id, data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.updated', {
                    type: 'info',
                    messageArgs: { smart_count: 1 }
                });
                redirect('list', 'users', editedUser.id);
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
        [update, notify, redirect]
    );

    return (
        <Edit>
            <SimpleForm onSubmit={save} toolbar={<EditToolbar />}>
                <UserForm isEdit={true} />
            </SimpleForm>
        </Edit>
    );
}