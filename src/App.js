import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './componenets/layout/Navbar';
import Search from './componenets/users/Search';
import axios from 'axios';
import Alert from './componenets/layout/Alert';
import About from './componenets/pages/About';
import './App.css';
import Users from './componenets/users/Users';


class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

/*
  // Initial User 
  async componentDidMount () {
    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });
  }
*/
 // Search GitHub Users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get
      (`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
    
  };
  // clear users from State
  clearUsers = () => this.setState({ users: [], loading: false });
  //Set Alert
  setAlert = (msg, type) => {
    this.setState({alert:{msg, type} });
    setTimeout(() => this.setState({alert:null}),3000);
  };

  render () {
    const { users, loading } = this.state;
    return (
     <Router> 
      <div className="App" >
        <Navbar />
        <div className='container'>
        
        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                <Users loading={loading} users={users}/>
        
            </Fragment>
              )} />
          <Route exact path='/about' component={About}/>    
        </Switch>
        
        </div>
    </div>
    </Router>
    );
  }
}
export default App;
