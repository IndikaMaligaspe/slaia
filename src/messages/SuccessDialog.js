import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import React from 'react';


const SuccessDialog = ({ handleClose, open, successMesage}) => {

    const onCancel =() => {
        handleClose(false,'');
    }

    let content =  <></> 

    if(open){
        content = 
                    <Dialog  
                        open={open}
                        onClose={onCancel}
                        closeAfterTransition
                        BackdropComponent={Backdrop}>
                        <DialogTitle  color="error"> Message 
                        </DialogTitle>
                        <DialogContent>
                                    {successMesage}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onCancel}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                
    }

    return (
        <React.Fragment>{content}</React.Fragment>
    );

}

export default SuccessDialog;