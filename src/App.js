import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './componenets/layout/Navbar';
import Search from './componenets/users/Search';
import axios from 'axios';
import Alert from './componenets/layout/Alert';
import About from './componenets/pages/About';
import Users from './componenets/users/Users';
import User from './componenets/users/User';
import './App.css';


class App extends Component {
  state = {
    users: [],
    user: {},
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
  //Get a Single GitHub User
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get
      (`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  };

  // clear users from State
  clearUsers = () => this.setState({ users: [], loading: false });
  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render () {
    const { users, user, loading } = this.state;
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
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
