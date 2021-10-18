import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Ec2Service from '../../services/Ec2Service';
import LoopIcon from '@material-ui/icons/Loop';
import { useToasts } from 'react-toast-notifications'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable(props) {
  const { addToast } = useToasts()

  const classes = useStyles();
  const ec2 = props.ec2
  
  const stopInstance = async (instance_id) => {
    try {
      await Ec2Service.stopInstance(props.client_name, props.region, instance_id)
      addToast('Stopping Instance with ID: '+instance_id, { appearance: 'success' })
      props.trigger('ec2')
    }
    catch (error) {
      addToast('Error Stopping Instance', { appearance: 'error' })

      console.log(error)

    }

  }

  const startInstance = async (instance_id) => {
    try {
      await Ec2Service.startInstance(props.client_name, props.region, instance_id)
      addToast('Starting Instance with ID: '+instance_id, { appearance: 'success' })

      props.trigger('ec2')

    }
    catch (error) {
      addToast('Error Starting Instance', { appearance: 'error' })

      console.log(error)

    }
  }
  const restartInstance = async (instance_id) => {
    try {
      await Ec2Service.restartInstance(props.client_name, props.region, instance_id)
      addToast('Restarting Instance with ID: '+instance_id, { appearance: 'success' })

      props.trigger('ec2')

    }
    catch (error) {
      addToast('Error Restarting Instance', { appearance: 'error' })

      console.log(error)

    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center" className="font-weight-bold">Public ip</TableCell>
            <TableCell align="center" className="font-weight-bold">State</TableCell>
            <TableCell align="center" className="font-weight-bold">Name</TableCell>
            <TableCell align='center' className="font-weight-bold">Instance Id</TableCell>
            <TableCell align="center" className="font-weight-bold">Instance Type</TableCell>
            <TableCell align="center" className="font-weight-bold">Last Launch Time</TableCell>
            <TableCell align="center" className="font-weight-bold">Public DNS</TableCell>
            <TableCell align="center" className="font-weight-bold">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ec2.map((instance) => (
            < TableRow key={instance.intstanceId} >
              <TableCell align='center' component="th" scope="row">
                {instance.public_ip}
              </TableCell>
          <TableCell align="center">{instance.state==='stopped' && <FiberManualRecordIcon style={{color: 'red'}}/>}{instance.state==='running' && <FiberManualRecordIcon style={{color: 'green'}}/>}{instance.state}</TableCell>
              <TableCell align="center">{instance.name}</TableCell>

              <TableCell align="center">{instance.instanceId}</TableCell>
              <TableCell align="center">{instance.instance_type}</TableCell>
              <TableCell align="center">{instance.launch_time}</TableCell>
              <TableCell align="center">{instance.public_dns}</TableCell>
              <TableCell align="center" >
                <Grid container direction='row' justify='center' alignItems='center'>
                  {(instance.state === 'stopped' || instance.state === 'stopping') && <Grid item>
                    <IconButton size="small" onClick={() => startInstance(instance.instanceId)}><PlayArrowIcon style={{ color: "green" }}></PlayArrowIcon></IconButton>
                  </Grid>}

                  {(instance.state === 'running' || instance.state === 'pending') && <Grid item>
                    <IconButton onClick={() => stopInstance(instance.instanceId)} size="small"><StopIcon style={{ color: "red" }}></StopIcon></IconButton>
                  </Grid>}
                  {(instance.state === 'running' || instance.state === 'pending') && <Grid item>
                    <IconButton onClick={() => restartInstance(instance.instanceId)} size="small"><LoopIcon style={{ color: "orange" }}></LoopIcon></IconButton>
                  </Grid>}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}
