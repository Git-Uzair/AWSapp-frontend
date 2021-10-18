import React, { Component } from 'react';
import LoginForm from './LoginForm';




class Login extends Component {
    
    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({ loggedIn: true })
            this.props.history.push('/Dashboard')
        }
    }


    render() {
        return (
                <div>
                    <LoginForm></LoginForm>
                </div>
            

        );
    }
}

export default Login;
