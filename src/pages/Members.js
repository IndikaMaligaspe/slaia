import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import MembersForm from '../Forms/Members'


function preventDefault(event) {
  event.preventDefault();
}


const Members =() => {

  const [rows, setRows] = React.useState([]);
  const [rowsPerPage,setRowsPerPage] = React.useState(10);
  const [page,setPage] = React.useState(0);

  const [open, setOpen] = React.useState(false);


  const  callBackApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();

    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }
  React.useEffect(async () =>{
    let rows = await callBackApi();
    setRows(rows);
  },[]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = (event) => {
    setOpen(true);
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
        </Grid>
        <Grid item xs={1} md={1}>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </Grid>
        <Grid item xs={1} md={1}>
          <Button variant="contained" color="error">Delete</Button>
        </Grid>
        <Grid item>
        </Grid>
        <Grid item xs={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Payments for</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&  rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{`LKR ${row.amount}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: "secondary"
                  }}
                  nextIconButtonProps={{ color: "secondary" }}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "page number"
                    }
                  }}
                  showFirstButton={true}
                  showLastButton={true}
                  //ActionsComponent={TablePaginationActions}
                  //component={Box}
                  //sx and classes prop discussed in styling section
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Grid>
      <MembersForm 
        open={open}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
}

export default Members;