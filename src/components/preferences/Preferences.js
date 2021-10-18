import React, { Component } from 'react'
import Header from '../layout/Header';
import Sidebar from '../layout/SidebarPref'
import { Grid, Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountTable from '../layout/AccountTable'
import AddClient from '../layout/AddClient'
import ClientService from '../../services/ClientService';
import ClientsTable from '../layout/ClientsTable';
import EditClient from '../layout/EditClient';

import PersonAddIcon from '@material-ui/icons/PersonAdd';



class Preferences extends Component {


    state = {
        clients: []
    }

    static getDerivedStateFromProps(props, state) {
        if (!localStorage.getItem('user') && !localStorage.getItem('client')) {
            props.history.push('/')
            return
        }

        return { name: JSON.parse(localStorage.getItem('client')).name, default_region: JSON.parse(localStorage.getItem('client')).region, _id: JSON.parse(localStorage.getItem('client'))._id };
    }

    async componentDidMount() {

        if (!localStorage.getItem('client') && !localStorage.getItem('user')) {
            this.props.history.push('/')
            return
        }
        try {
            let client = await ClientService.getClient(JSON.parse(localStorage.getItem('client'))._id)
            this.setState(client)

            let clients = await ClientService.getAllClients()
            this.setState({ clients: clients })
        }
        catch (error) {
            console.log(error)
        }

    }


    render() {
        return (
            <div>
                <CssBaseline />
                <Header name={this.state.name} />
                <Grid container direction="row" justify="flex-start"  >
                    <Grid item xl={2}>
                        <Sidebar></Sidebar>
                    </Grid>
                    <Grid item xs={10} className='pt-5 pb-5 pl-5 pr-3'>
                        <Grid container direction='column' justify='center' alignItems='center'>
                            <Grid item style={{ width: '50%' }}>
                                {(window.location.pathname === '/preferences' || window.location.pathname === '/preferences/account') && <AccountTable client={this.state} />}
                            </Grid>
                        </Grid>
                        <Grid item>
                            {(window.location.pathname === '/preferences/client') && <Button onClick={() => this.props.history.push('/preferences/client/add')} style={{ marginBottom: '20px' }} variant="contained"
                                color="primary"
                                endIcon={<PersonAddIcon></PersonAddIcon>}>Add Client</Button>}
                        </Grid>
                        <Grid item>
                            {(window.location.pathname === '/preferences/client') && <ClientsTable clients={this.state.clients} _id={this.state._id} />}
                        </Grid>
                        <Grid item >
                            {(window.location.pathname === '/preferences/client/add') && <AddClient />}
                        </Grid>
                        <Grid item >
                            {(window.location.pathname.includes('/preferences/client/edit')) && <EditClient />}
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Preferences;