import { useCallback } from 'react';
import { Create, SimpleForm, TextInput, SelectInput, useRedirect, useNotify, useCreate } from 'react-admin';
import { Grid } from '@mui/material';

export const EmployeeCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();

    const save = useCallback(
        async values => {
            try {
                const createdEmployee = await create(
                    'employees',
                    { data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.created', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect('list', 'employees', createdEmployee.id);
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
        </Create>
    );
}
