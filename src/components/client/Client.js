import React, { Component } from 'react';
import Switch from 'react-switch'
import ClientService from '../../services/ClientService'


class Client extends Component {

    state = {}
    componentDidMount() {
        this.setState(this.props.client)
    }
    handleChange = async (checked) => {

        this.setState({ status: checked, updated_by: JSON.parse(localStorage.getItem('user')).user._id }, async () => {
            await ClientService.updateClient(this.state)
        })


    }
    render() {
        return (

            <React.Fragment>
                <tr>
                    <td>{this.state.name}</td>
                    <td><label>
                        <Switch onChange={this.handleChange} checked={this.state.status} />
                    </label></td>
                    <td>@twitter</td>
                </tr>
            </React.Fragment>

        );
    }
}

export default Client;
