import React, { Component } from 'react';
import ClientService from '../../services/ClientService'
import Client from './Client'


class Clients extends Component {
    state = {
        clients: []
    }
    async componentDidMount() {

        let Clients = await ClientService.getAllClients()
        this.setState({ clients: Clients })
    }
    render() {
        const { clients } = this.state
        return (
            clients.map(client => (
                <Client key={client._id} client={client} />
            ))
        );
    }
}

export default Clients;
