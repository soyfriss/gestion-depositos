import { TextInput, SelectInput, PasswordInput } from 'react-admin';
import { Grid } from '@mui/material';
import { StatusSelect } from '../components/StatusSelect';

export const UserForm = ({ isEdit }) => {
    return <>
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={12} md={6} sm={12}   >
                <TextInput
                    required
                    fullWidth
                    label="Username"
                    source="username"
                    autoFocus
                />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
                <PasswordInput
                    fullWidth
                    label="Password"
                    source={isEdit ? 'passwordEdit':'password'}
                />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
                <SelectInput
                    source="role"
                    label="Role"
                    optionValue="name"
                    defaultValue={"Admin"}
                    choices={[
                        { id: "Admin", name: "Admin" },
                    ]}
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
                <StatusSelect />
            </Grid>
        </Grid>
    </>
}