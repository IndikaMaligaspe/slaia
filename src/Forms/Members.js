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
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Typography } from '@mui/material';


const initialValues = {
    name:"",
    nic:"",
    address:"",
    dob: new Date('2001-01-01').toUTCString(),
    gender:"M",
    occupation:"",
    doj: new Date('2001-01-01').toUTCString(),
}


const Members = ({open, handleClose, createOrUpdateMembers, recordToUpdate}) => {
    const [values, setValues] = useState(initialValues);

    useEffect (()=>{
        if (recordToUpdate)
            setValues(recordToUpdate);
        else
            setValues(initialValues);
    },[recordToUpdate])

    const handleInput = (e) =>{
        const {name, value} = e.target;
        values[name] = value;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleDOJ = (_doj) => {
        setValues({
            ...values,
            'doj': _doj.toUTCString()
        });
    };

    
    const handleDOB = (_dob) => {
        setValues({
            ...values,
            'dob': _dob.toUTCString()
        });
    };

    const onClose = () => {
        handleClose(false);
      };
    

    const onSave = () =>{
        console.log(values);
        createOrUpdateMembers(values);
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
                    <DialogTitle>Create Member

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
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", marginBottom:"5px"}}
                                        name="name"
                                        required
                                        type="text"
                                        label="Name" 
                                        variant="outlined"
                                        value={values.name}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>    
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "200px", marginBottom:"5px" }}
                                        name="nic"
                                        required
                                        type="text"
                                        label="NIC or Passport" 
                                        variant="outlined"
                                        inputProps={
                                            {maxLength: 20}
                                        }
                                        value={values.nic}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>    

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", marginBottom:"5px" }}
                                        name="address"
                                        type="text"
                                        label="Address"
                                        variant="outlined"
                                        value={values.address}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <DesktopDatePicker
                                        style={{ width: "400px", marginBottom:"5px" }}
                                        name="dob"
                                        label="Date of birth"
                                        inputFormat="MM/dd/yyyy"
                                        value={values.dob}
                                        onChange={handleDOB}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>   
                                <Grid item xs={6} md={6}>
                                    <Typography>
                                        <Grid item xs={6} md={6}>
                                            <div>Sex</div>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender"
                                                value={values.gender}
                                                onChange={(event)=>{handleInput(event)}}
                                                style={{ marginLeft: "20px" }}
                                            >
                                                <FormControlLabel value="M" control={<Radio />} label="Male" />
                                                <FormControlLabel value="F" control={<Radio />} label="Female" />
                                            </RadioGroup>    
                                        </Grid>   
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", marginBottom:"5px" }}
                                        name="occupation"                                    
                                        type="text"
                                        label="Occupation"
                                        variant="outlined"
                                        value={values.occupation}
                                        onChange={(event)=>{handleInput(event)}}
                                    />
                                </Grid>   
                                <Grid item xs={12} md={12}>
                                    <DesktopDatePicker
                                        label="Date of join"
                                        name="doj"
                                        inputFormat="MM/dd/yyyy"
                                        value={values.doj}
                                        onChange={handleDOJ}
                                        renderInput={(params) => <TextField {...params} />}
                                        // onChange={(event)=>{handleInput(event);handleDOJ()}}
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

export default Members;
