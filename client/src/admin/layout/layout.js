import { Layout } from 'react-admin';
import { Menu } from './menu';
import { ProfileAppBar } from './app-bar';


export const ProfileLayout = props =>
    <Layout
        sx={{
            "& .RaLayout-appFrame": {
                marginTop: "5rem",
            },
            "& .MuiAppBar-root": {
                background: "rgba(0, 0, 0, 0.8)",
                height: "4rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }
        }}
        {...props}
        menu={Menu}
        appBar={ProfileAppBar}
    />;