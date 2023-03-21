import { TextInput, SelectInput } from 'react-admin';
import { Grid } from '@mui/material';

export const EmployeeForm = () => {
    return <>
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
    </>
}