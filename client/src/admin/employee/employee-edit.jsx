import { useCallback } from 'react';
import { Edit, SimpleForm, TextInput, Toolbar, SaveButton, useRedirect, useNotify, useUpdate, SelectInput } from 'react-admin';
import { Grid } from '@mui/material';

// Custom toolbar without <DeleteButton>
const PostEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

export const EmployeeEdit = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [update] = useUpdate();

    const save = useCallback(
        async values => {
            try {
                const updatedEmployee = await update(
                    'employees',
                    { id: values.id, data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.updated', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect('list', 'employees', updatedEmployee.id);
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
                <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={12} md={4} sm={12}   >
                            <TextInput
                                required
                                fullWidth
                                label="First Name"
                                source="firstname"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            <TextInput
                                required
                                fullWidth
                                label="Last Name"
                                source="lastname"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            <TextInput
                                required
                                fullWidth
                                label="Email Address"
                                source="email"
                                type='email'
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            <TextInput
                                required
                                fullWidth
                                label="Phone"
                                source="phone"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            <TextInput
                                required
                                fullWidth
                                source="filenumber"
                                label="File Number"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            <SelectInput 
                                source="status"
                                label="Status"
                                optionValue="name"
                                defaultValue={"Active"}
                                choices={[
                                    { id: "Active", name: "Active" },
                                    { id: "Disabled", name: "Disabled" }
                                ]}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
            </SimpleForm>
        </Edit>
    );
}