import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import PersonAdd from '@mui/icons-material/PersonAdd';
import HowToReg from '@mui/icons-material/HowToReg';
import Payments from '@mui/icons-material/Payments';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';

const MainListItems = (props) => {

  const [membersOpen, setMembersOpen] = React.useState(false);

  return(
    <div>
      <ListItem button
        onClick={()=>{props.setComponent("dashboard")}}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button
        onClick={()=>{setMembersOpen(!membersOpen)}}
      >
        <ListItemIcon>
        <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Members" />
        {membersOpen ? <ExpandLess/> : <ExpandMore />}
      </ListItem>
      <Collapse in={membersOpen} timeout="auto" unmountOnExit>
        <List component={"div"} disablePadding>
          <ListItem button sx={{ pl: 4 }}
            onClick={()=>{props.setComponent("member")}}
          >
             <ListItemIcon>
               <PersonAdd />
             </ListItemIcon>
             <ListItemText primary="Manage" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }}
            onClick={()=>{props.setComponent("memberPayments")}}
          >
             <ListItemIcon>
               <Payments />
             </ListItemIcon>
             <ListItemText primary="Payments" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }}
            onClick={()=>{props.setComponent("memberAttendance")}}
          >
             <ListItemIcon>
               <HowToReg />
             </ListItemIcon>
             <ListItemText primary="Attendance" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
       
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Communications" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </div>
  );
}

const SecondaryListItems = (props) => {
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  );
}

export {MainListItems, SecondaryListItems};