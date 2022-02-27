import {useState} from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Members = ({open, handleClose, recordToUpdate}) => {
    const [doj, setDOJ] = useState(new Date());
    const [dob, setDOB] = useState(new Date());
    const [sex, setSex] = useState('M');

    
    const handleDOJ = (doj) => {
        setDOJ(doj);
    };

    
    const handleDOB = (dob) => {
        setDOB(dob);
    };

    const handleSex = (_sex) => {
        console.log('sex',_sex);
        setSex(_sex);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={BoxStyle}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", margin: "5px" }}
                                        id="name"
                                        required
                                        type="text"
                                        label="Name" 
                                        variant="outlined"
                                    />
                                </Grid>    
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "200px", margin: "5px" }}
                                        id="nic"
                                        required
                                        type="text"
                                        label="NIC or Passport" 
                                        variant="outlined"
                                        inputProps={
                                            {maxLength: 20}
                                        }
                                    />
                                </Grid>    

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", margin: "5px" }}
                                        id="address1"
                                        type="text"
                                        label="Address Line 1"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", margin: "5px" }}
                                        id="address2"                                    
                                        type="text"
                                        label="Address Line 2"
                                        variant="outlined"
                                    />
                                </Grid>    
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "250px", margin: "5px" }}
                                        id="city"                                    
                                        type="text"
                                        label="City"
                                        variant="outlined"
                                    />
                                </Grid>   
                                <Grid item xs={12} md={12}>
                                    <DesktopDatePicker
                                        style={{ width: "400px", margin: "5px" }}
                                        label="Date of birth"
                                        inputFormat="MM/dd/yyyy"
                                        value={dob}
                                        onChange={handleDOB}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>   
                                <Grid item xs={6} md={6}>
                                    <RadioGroup
                                        aria-label="Gender"
                                        name="gender1"
                                        // className={classes.group}
                                        value={sex}
                                        onChange={handleSex}
                                    >
                                        <FormControlLabel value="F" control={<Radio />} label="Female" />
                                        <FormControlLabel value="M" control={<Radio />} label="Male" />
                                    </RadioGroup>    
                                </Grid>   
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        style={{ width: "400px", margin: "5px" }}
                                        id="occupation"                                    
                                        type="text"
                                        label="Occupation"
                                        variant="outlined"
                                    />
                                </Grid>   
                                <Grid item xs={12} md={12}>
                                    <DesktopDatePicker
                                        label="Date of join"
                                        inputFormat="MM/dd/yyyy"
                                        value={doj}
                                        onChange={handleDOJ}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>   
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </LocalizationProvider>
    );
}

export default Members;
