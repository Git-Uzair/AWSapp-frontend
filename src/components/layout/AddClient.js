import React, { useState} from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ClientService from '../../services/ClientService';
import { useToasts } from 'react-toast-notifications'
import { withRouter } from 'react-router-dom';




const AccountTable = (props) => {
    const { addToast } = useToasts()

    const [name, setName] = useState('')
    const [aws_access_key_id, setKey] = useState('')
    const [aws_secret_access_key, setSecret] = useState('')
    const [default_region, setRegion] = useState('')



    const onSubmit = async (event) => {
        event.preventDefault()

        if (aws_access_key_id.length === 20 && aws_secret_access_key.length === 40) {
            try {
                console.log(name)
                let added_client = await ClientService.AddClient({ name, aws_access_key_id, aws_secret_access_key, default_region, status: true, created_by: JSON.parse(localStorage.getItem('user'))._id, deleted: false })
                addToast('Client created with Id ' + added_client._id, { appearance: 'success' })
                props.history.push('/preferences/client')
                window.location.reload()

            }
            catch (error) {
                addToast('Add Failed', { appearance: 'error' })
                console.log(error)
            }
        }
        else {
            addToast('AWS Keys invalid', { appearance: 'error' })

        }

    }



    return (
        <div>

            <Paper>
                <PermIdentityIcon style={{ marginTop: '10px' }} fontSize='large' />
                <Grid item>
                    <h4>Add Client</h4>
                </Grid>
                <form style={{ padding: '10px' }} onSubmit={(event) => onSubmit(event)} >
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            id="name"
                            value={name}
                            label="Name"
                            name="name"
                            autoFocus
                            length={3}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            id="accessId"
                            value={aws_access_key_id}
                            label="AWS Access Key Id"
                            name="aws_access_key_id"
                            autoFocus
                            onChange={(event) => { setKey(event.target.value) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            id="secretkey"
                            value={aws_secret_access_key}
                            label="AWS Secret Key"
                            name="aws_secret_access_key"
                            autoFocus
                            onChange={(event) => { setSecret(event.target.value) }}
                        />
                        <Select variant='outlined' style={{ width: "223px", marginTop: '15px' }} required value={default_region} onChange={(event) => { setRegion(event.target.value) }}>
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

                        <Button style={{ marginTop: '15px' }}
                            type="submit"

                            variant="contained"
                            color="primary"

                        >
                            Add
                </Button>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}

export default withRouter(AccountTable);
