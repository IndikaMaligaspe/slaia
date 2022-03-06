import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import React from 'react';

const DeleteRecord = ({ handleClose, handleOk, message, open }) =>{

    const onOk =() => {
        handleOk(true);
    }

    const onCancel =() => {
        handleOk(false);
        handleClose(false);
    }

    return (
        <React.Fragment>
            <Dialog  
                open={open}
                onClose={onCancel}
                closeAfterTransition
                BackdropComponent={Backdrop}>
                <DialogTitle  color="error"> Delete 
                </DialogTitle>
                <DialogContent>
                            {message}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button onClick={onOk}  color="error">Delete</Button>
                    </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteRecord;
