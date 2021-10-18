import React, { Component } from 'react'
import Header from '../layout/Header1'
import Clients from './Clients'
class ClientSelect extends Component {

    state = { clients: [] }


    async componentDidMount() {
        if (!localStorage.getItem('user')) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (

            <div >
                <Header history={this.props.history} />
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Clients/>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        )
    }
}

export default ClientSelect;
