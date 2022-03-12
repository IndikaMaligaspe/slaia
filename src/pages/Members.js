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

import * as useMemberService from '../components/services/MembersService';

const initRecordToUpdate = {
  id: '',
  name:'',
  nic:'',
  address:'',
  dob: new Date(),
  gender:'M',
  occupation:'',
  doj: new Date('2001-01-01'),
}
const Members =() => {

  const [rows, setRows] = React.useState([]);
  const [rowsPerPage,setRowsPerPage] = React.useState(10);
  const [page,setPage] = React.useState(0);
  const [recordToUpdate, setRecordToUpdate] = React.useState(initRecordToUpdate);
  const [deleteMessage, setDeleteMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [service, setService] = React.useState(useMemberService)
  const [reload, setReload] = React.useState(true);

  const [selected, setSelected] = React.useState([]);

  
  const  getMembers = async () => {
    const response = await fetch(service.getMembers);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }


  const createOrUpdateMembers = async (values) => {
    if(!recordToUpdate) {
      const response = await fetch(service.postMembers, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
    } else {
        const response = await fetch(service.putMember+`/${recordToUpdate.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
    }
    setReload(true);
  }

  React.useEffect(async () =>{
    let rows = await getMembers();
    setRows(rows);
    setReload(false);
  },[reload]);


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
    setRecordToUpdate(null);
    setOpen(true);
  }

  const handleDelete = (event) => {
    const message='Do you wish to delete these members ?';
    setDeleteMessage(message);
    setDeleteDialog(true);
  }

  const handleEdit = (event, _id) => {
    setRecordToUpdate(rows.map((r)=>{
        return({
          id: r.id,
          name:r.name,
          nic:r.nic,
          address:r.address,
          dob: new Date(r.date_of_birth),
          gender:r.sex,
          occupation:r.occupation,
          doj: new Date(r.date_of_join),
        })
    }).find((r)=>r.id === _id));
    setOpen(true);
  }

  const handleDeleteRecord= async ()=>{
    setDeleteDialog(false);
    try{
      const response = await fetch(service.deleteMember+`/${selected}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setReload(true);
    } catch(err) {
      console.log(err);
    }
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
                <TableCell>Membership No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>NIC</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Date of Join</TableCell>
                <TableCell>Occupation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&  rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return(<TableRow key={row.id}
                    hover
                    onClick={(event) =>  handleEdit(event,row.id)}
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
                  <TableCell>M-{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.nic}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{new Date(row.date_of_birth).toISOString().split('T')[0]}</TableCell>
                  <TableCell>{new Date(row.date_of_join).toISOString().split('T')[0]}</TableCell>
                  <TableCell>{row.occupation}</TableCell>
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
        createOrUpdateMembers={createOrUpdateMembers}
      />
      <DeleteRecord
        handleClose={handleClose}
        handleOk={handleDeleteRecord}
        message={deleteMessage}
        open={deleteDialog}
        selected={selected}
      ></DeleteRecord>
    </React.Fragment>
  );
}

export default Members;