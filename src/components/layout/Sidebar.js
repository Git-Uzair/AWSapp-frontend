import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import MemoryIcon from '@material-ui/icons/Memory';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Sidebar(props) {
    const location = useLocation();
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index, URL) => {
        props.history.push(URL)
        setSelectedIndex(index);
    };

    return (
        <div className={classes.root} style={{height:'100vh', backgroundColor:'#18202c'}}>
            <List subheader={<ListSubheader className="font-weight-bold"><span style={{color:'#FFFFFF'}}>Resources</span></ListSubheader>} component="nav" >
            <Divider style={{backgroundColor: '#FFFFFF'}}/>

                <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1, '/Dashboard/ec2')}
                >
                    <ListItemIcon>
                        <DraftsIcon  style={{color:'#FFFFFF'}}/>
                    </ListItemIcon>
                    <ListItemText style={{color:'#FFFFFF'}} primary="EC2" />
                </ListItem>
                <Divider style={{backgroundColor: '#FFFFFF'}}/>
                <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2, '/Dashboard/rds')}
                >
                    <ListItemIcon>
                        <MemoryIcon style={{color:'#FFFFFF'}} />
                    </ListItemIcon>
                    <ListItemText style={{color:'#FFFFFF'}} primary="RDS" />
                </ListItem>
                <Divider style={{backgroundColor: '#FFFFFF'}}/>


                <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3, '/Dashboard/s3')}>
                    <ListItemIcon>
                        <DraftsIcon style={{color:'#FFFFFF'}}/>
                    </ListItemIcon>
                    <ListItemText style={{color:'#FFFFFF'}} primary="S3" />
                </ListItem>
                <Divider style={{backgroundColor: '#FFFFFF'}}/>


            </List>


        </div>
    );
}

export default withRouter(Sidebar);
