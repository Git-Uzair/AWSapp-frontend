import React, { Component } from 'react'
import Header from '../layout/Header';
import Ec2Service from '../../services/Ec2Service'
import Sidebar from '../layout/Sidebar'
import { Grid, Paper } from '@material-ui/core';
import Table from '../layout/Table'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';





export default class Dashboard extends Component {

    state = {
        ec2: []

    }

    static getDerivedStateFromProps(props, state) {
        if (!localStorage.getItem('user') && !localStorage.getItem('client')) {
            props.history.push('/')
            return
        }
        
        return { client: JSON.parse(localStorage.getItem('client')).name, region: JSON.parse(localStorage.getItem('client')).region };
    }

    async componentDidMount() {

        try {
            let ec2_list = await Ec2Service.getInstances(this.state.client, this.state.region)
            this.setState({ ec2: ec2_list })

        }
        catch (error) {
            console.log(error.response.status)
            
        }

    }

    trigger = async (type) => {
        if (type === 'ec2') {
            let ec2_list = await Ec2Service.getInstances(this.state.client, this.state.region)
            this.setState({ ec2: ec2_list })
        }
    }


    changeSelect = async (event) => {
        try {
            let ec2_list = await Ec2Service.getInstances(this.state.client, event.target.value)
            this.setState({ ec2: ec2_list})
        }
        catch (error) {
            console.log(error)
        }

    }
    render() {
        return (
            <div>
                <Header name={this.state.client} />
                <Grid container direction="row" justify="flex-start"  >
                    <Grid item xl={2}>
                        <Sidebar></Sidebar>
                    </Grid>

                    <Grid item xs={10} className='pt-5 pb-5 pl-5 pr-3'>
                        <Grid container direction="column" justify="flex-start">
                            <Select label='Default Region' style={{ width: "200px" }} onChange={this.changeSelect} defaultValue={this.state.region}>
                                <MenuItem value="us-east-2">us-east-2</MenuItem>
                                <MenuItem value="us-east-1">us-east-1</MenuItem>
                                <MenuItem value="us-west-1">us-west-1</MenuItem>
                                <MenuItem value="us-west-2">us-west-2</MenuItem>
                                <MenuItem value="ap-south-1">ap-south-1</MenuItem>
                                <MenuItem value="ap-northeast-2">ap-northeast-2</MenuItem>
                                <MenuItem value="ap-southeast-1">ap-southeast-1</MenuItem>
                                <MenuItem value="ap-southeast-2">ap-southeast-2</MenuItem>
                                <MenuItem value="ap-northeast-1">ap-northeast-1</MenuItem>
                                <MenuItem value="ca-central-1">ca-central-1</MenuItem>
                                <MenuItem value="eu-central-1">eu-central-1</MenuItem>
                                <MenuItem value="eu-west-1">eu-west-1</MenuItem>
                                <MenuItem value="eu-west-2">eu-west-2</MenuItem>
                                <MenuItem value="eu-south-1">eu-south-1</MenuItem>
                                <MenuItem value="eu-west-3">eu-west-3</MenuItem>
                                <MenuItem value="eu-north-1">eu-north-1</MenuItem>
                                <MenuItem value="sa-east-1">sa-east-1</MenuItem>
                            </Select>
                            <Paper elevation={3} style={{ marginTop: "20px" }}>
                                <Table ec2={this.state.ec2} client_name={this.state.client} region={this.state.region} trigger={this.trigger} />
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        )
    }
}
