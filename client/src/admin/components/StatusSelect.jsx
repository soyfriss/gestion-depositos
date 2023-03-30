import { SelectInput } from "react-admin";

export const StatusSelect = () => {
    return <>
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
    </>
}
