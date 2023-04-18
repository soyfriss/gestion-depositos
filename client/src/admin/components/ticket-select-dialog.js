import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Datagrid, DateField, List, RichTextField, TextField } from 'react-admin';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const rowClick = (id, resource, record) => {
        console.log(id, resource, record);
        onClose(record);
    };

    const ArticlesPanel = () => {
        return <RichTextField source='articles[0].body' fullWidth />
    }

    return (
        <Dialog onClose={handleClose} open={open} fullScreen TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Select ticket
                    </Typography>
                </Toolbar>
            </AppBar>
            <List resource="tickets"
                queryOptions={{
                    meta: { usePartialPagination: true },
                }}
            >
                <Datagrid bulkActionButtons={false} expand={<ArticlesPanel />} rowClick={rowClick}>
                    <DateField source="ticketDate" sortable={false} />
                    <TextField source="number" sortable={false} />
                    <TextField source="title" sortable={false} />
                    <TextField source="customer" sortable={false} />
                </Datagrid>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object,
};

export default function TicketSelectDialog({ setTicket }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        setTicket(value);
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {selectedValue &&
                    <>
                        <Typography variant="subtitle1" component="div" sx={{ mr: 2 }}>
                            Ticket Selected: {selectedValue.number}
                        </Typography>
                        <Button variant="outlined" onClick={() => setSelectedValue(null)} sx={{ mr: 2 }}>
                            Remove ticket
                        </Button>
                    </>
                }
                {!selectedValue &&
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Select ticket
                    </Button>
                }
            </div>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
