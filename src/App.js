import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastProvider} from 'react-toast-notifications'

import Login from './components/login/Login';
import ClientSelect from './components/client/ClientSelect';
import Dashboard from './components/dashboard/Dashboard';
import Preferences from './components/preferences/Preferences';
import Table from './components/layout/Table'



function App() {
  return (
    <Router>
      <ToastProvider>
      <div className="App">
          <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/preferences" component={Preferences} />
      </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
