import { useCallback } from 'react';
import { useNotify, Edit, SimpleForm, TextInput, useUpdate, PasswordInput, useLogout } from 'react-admin';
import { Grid } from '@mui/material';
import EditToolbar from '../components/EditToolbar';

export const ProfileEdit = (props) => {


    const notify = useNotify();
    const [update] = useUpdate();
    const logout = useLogout();
   
    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    const save = useCallback(
        async values => {
            try {

                if (values.passwordEdit == null) {
                    delete values.passwordEdit;
                }

                await update(
                    'profile',
                    { id: values.id, data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.updated', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                    onSuccess: handleLogout,
                });

                handleLogout();

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

                return notify('Unknown error', {
                    type: 'error'
                });
            }
        },
        [update, notify, handleLogout]
    );

    return (
        <Edit>
            <SimpleForm onSubmit={save} toolbar={<EditToolbar />}>
                <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={12} md={6} sm={12}   >
                        <TextInput
                            fullWidth
                            label="Username"
                            source='username'
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                        <PasswordInput
                            fullWidth
                            label="Password"
                            source='passwordEdit'
                        />
                    </Grid>
                </Grid>
            </SimpleForm>
        </Edit>
    );
};

