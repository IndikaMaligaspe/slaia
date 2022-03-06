import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import MembersForm from '../Forms/Members';
import DeleteRecord from '../messages/DeleteRecord';
import Checkbox from '@mui/material/Checkbox';


const recordToChangeInit = {
    id: 1,
    name:"Indika Maligaspe",
    nic:"772650590V",
    address1:"test1",
    address2:"test2",
    city:"Colombo",
    dob: new Date('1977-09-21').toUTCString(),
    gender:"M",
    occupation:"CTO",
    doj: new Date('2001-01-01').toUTCString(),
}

const Members =() => {

  const [rows, setRows] = React.useState([]);
  const [rowsPerPage,setRowsPerPage] = React.useState(10);
  const [page,setPage] = React.useState(0);
  const [recordToUpdate, setRecordToUpdate] = React.useState();
  const [deleteMessage, setDeleteMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const [selected, setSelected] = React.useState([]);



  const  callBackApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();

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

  const handleClose = () => {
    setOpen(false);
    setDeleteDialog(false);
  }

  const handleCreate = (event) => {
    setOpen(true);
  }

  const handleDelete = (event) => {
    const message='Do you wish to delete these members ?';
    setDeleteMessage(message);
    setDeleteDialog(true);
  }

  const handleEdit = (event) => {
    setRecordToUpdate(recordToChangeInit);
    setOpen(true);
  }

  const handleDeleteRecord=()=>{

  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1;
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
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </Grid>
        <Grid item>
        </Grid>
        <Grid item xs={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Payments for</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&  rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return(<TableRow key={row.id}
                    hover
                    onClick={(event) =>  handleEdit(event)}
                  >
                  <TableCell padding="checkbox">
                      <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{`LKR ${row.amount}`}</TableCell>
                </TableRow>);
              })}
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
        recordToUpdate={recordToUpdate}
      />
      <DeleteRecord
        handleClose={handleClose}
        handleOk={handleDeleteRecord}
        message={deleteMessage}
        open={deleteDialog}
      ></DeleteRecord>
    </React.Fragment>
  );
}

export default Members;