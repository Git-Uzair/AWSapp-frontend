import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router-dom';
import ClientService from '../../services/ClientService'
import { useToasts } from 'react-toast-notifications'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';




import { Grid } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const ClientsTable = (props) => {

    const { addToast } = useToasts()



    const toggleChecked = async (client) => {
        client.status = !client.status
        client.deleted = false
        try {
            await ClientService.updateClient(client)
            addToast('Client ' + client.name + ' Active status updated', { appearance: 'success' })


        }
        catch (error) {
            console.log(error)
        }

    };

    const deleteClient = async (client) => {
        try {
                client.deleted=true
                console.log("hello")
                await ClientService.DeleteClient(client)
                props.history.push('/preferences/client')
                window.location.reload()


        }
        catch (error) {
            console.log(error)
        }
    }

    const onChange = async (client) => {
        try {
            if (client.status === false) {
                client.status = !client.status
                await ClientService.updateClient(client)
            }
            console.log(client.region)
            localStorage.setItem('client', JSON.stringify({ name: client.name, region: client.default_region, _id: client._id }))
            props.history.push('/dashboard')
            window.location.reload()
        }
        catch (error) {
            console.log(error)
        }


    }

    const clients = props.clients

    const classes = useStyles();
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" className="font-weight-bold">Clients</TableCell>
                            <TableCell align="center" className="font-weight-bold">Selection</TableCell>
                            <TableCell align="center" className="font-weight-bold">Active</TableCell>
                            <TableCell align='center' className="font-weight-bold">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {clients && clients.filter((client)=>client.deleted===false).map((client, i) => (
                            < TableRow key={client._id} >
                                <TableCell align='center' component="th" scope="row">
                                    {client.name}
                                </TableCell>
                                <TableCell align='center'>
                                    <div className="radio">
                                        <input type="radio" name="selectradio" onChange={() => onChange(client)} checked={client._id === props._id ? true : false} />
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <Switch size="small" disabled={client._id === props._id ? true : false} checked={client.status} onChange={() => toggleChecked(client)} />
                                </TableCell>
                                <TableCell align='center'>
                                    <Grid container direction='row' justify='center' alignItems='center'>
                                        <Grid item>
                                            <IconButton onClick={() => (props.history.push('/preferences/client/edit/' + client._id))} size="small" ><EditIcon ></EditIcon></IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="small" disabled={client._id === props._id ? true : false} onClick={() => deleteClient(client)} ><DeleteIcon ></DeleteIcon></IconButton>
                                        </Grid>
                                    </Grid>
                                </TableCell>

                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    );
}

export default withRouter(ClientsTable);
