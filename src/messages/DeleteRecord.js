import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import React from 'react';

const DeleteRecord = ({ handleClose, handleOk, message, open, selected }) =>{

    const onOk =() => {
        handleOk(true);
    }

    const onCancel =() => {
        handleOk(false);
        handleClose(false);
    }

    let content = <></>;
    if (selected.length > 0) {
        content =  <div>
                    <DialogContent>
                            {message}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button onClick={onOk}  color="error">Delete</Button>
                    </DialogActions>
                </div> 
    } else {
        content =  <>
                    <DialogContent>
                            Please select an ID to delete
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCancel}>Cancel</Button>
                    </DialogActions>
                </> 
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
                {content}
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteRecord;
