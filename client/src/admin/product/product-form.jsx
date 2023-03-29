import { TextInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from "react-admin";
import { Grid } from '@mui/material'

export const ProductForm = () => {
    return <>
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={12} sm={12} md={6}>
                <TextInput
                    required
                    fullWidth
                    label="Name"
                    source="name"
                    autoFocus
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <SelectInput
                    required
                    fullWidth
                    label="Status"
                    source="status"
                    optionValue="name"
                    defaultValue="Active"
                    choices={[
                        { id: "Active", name: "Active" },
                        { id: "Active", name: "Active" }
                    ]}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    multiline
                    label="Description"
                    source="description"
                />
            </Grid>
            <Grid item xs={12}>
                <ReferenceArrayInput required reference="categories" source="Categories">
                    <SelectArrayInput
                        optionText="name"
                        fullWidth
                    />
                </ReferenceArrayInput>
            </Grid>
        </Grid>
    </>;
}
