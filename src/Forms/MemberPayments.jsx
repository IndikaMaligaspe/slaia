import {useState, useEffect} from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';




import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


const initialValues = {
    id: '',
    name:'',
    member_id:'',
    description:'',
    amount:'',
    date_of_payment: new Date(),
    reciept_no:'',
    remarks:''
  }
  

  
export default function MemberPayments({open, handleClose, createOrUpdateMembersPayment, recordToUpdate}) {
    const [values, setValues] = useState(initialValues);
    const [members, setMembers] = useState([]);

    useEffect (()=>{
        if (recordToUpdate)
            setValues(recordToUpdate);
        else
            setValues(initialValues);
    },[recordToUpdate])

    useEffect (()=>{
        setMembers(getMembers());
    },[])

    const getMembers=() => {
        return ([
            { label: 'The Shawshank Redemption', year: 1994 },
            { label: 'The Godfather', year: 1972 },
            { label: 'The Godfather: Part II', year: 1974 },
            { label: 'The Dark Knight', year: 2008 },
            { label: '12 Angry Men', year: 1957 },
            { label: "Schindler's List", year: 1993 },
            { label: 'Pulp Fiction', year: 1994 }]);
    }
    const handleInput = (e) =>{
        const {name, value} = e.target;
        values[name] = value;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleDOP = (_dop) => {
        setValues({
            ...values,
            'date_of_payment': _dop.toUTCString()
        });
    };

    const onClose = () => {
        handleClose(false);
      };
    

    const onSave = () =>{
        console.log(values);
        createOrUpdateMembersPayment(values);
        handleClose(false);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <Dialog
                    open={open}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    keepMounted
                >
                    <DialogTitle>Payments

                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <CloseIcon />
                    </IconButton>

                    </DialogTitle>
                    <DialogContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                <Autocomplete
                                    disablePortal
                                    name="member_id"
                                    options={members}
                                    value={values.member_id}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Members" />}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", marginBottom:"5px"}}
                                        name="description"
                                        required
                                        type="text"
                                        label="Description" 
                                        variant="outlined"
                                        value={values.description}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>    
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "200px", marginBottom:"5px" }}
                                        name="amount"
                                        required
                                        type="text"
                                        label="Amount" 
                                        variant="outlined"
                                        inputProps={
                                            {maxLength: 10}
                                        }
                                        value={values.amount}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>    

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", marginBottom:"5px" }}
                                        name="reciept_no"
                                        required
                                        type="text"
                                        label="Reciept No."
                                        variant="outlined"
                                        value={values.reciept_no}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <DesktopDatePicker
                                        style={{ width: "400px", marginBottom:"5px" }}
                                        name="date_of_payment"
                                        label="Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={values.date_of_payment}
                                        onChange={handleDOP}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>   
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", marginBottom:"5px" }}
                                        name="remarks"                                    
                                        type="text"
                                        label="Remarks"
                                        variant="outlined"
                                        value={values.remarks}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>   
                            </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </LocalizationProvider>
    );
}

