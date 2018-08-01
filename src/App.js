import React, { Component } from 'react';
import './App.css';
import GroupsList from './app/screens/groupslist';
import GroupDetails from './app/screens/groupdetails';
import NoData from './app/components/nodata';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    const noDataMessage = `Welcome to Share Bills Demo.
                           Click on a Group to see details.
                          `;
    return (
      <Router>
        <div>
          <div className="header fixed-top">
            <div className="container">
              <span className="header-title">Bill Sharing App Demo</span>
            </div>
          </div>
          <div className="container">
            <div className="content-body row">
              
              <div className="col-sm-12 col-md-4">
                <GroupsList />
              </div>
              <div className="col-sm-12 col-md-8">
                <Route exact path="/" render={() => (<NoData message={noDataMessage} />)} />
                <Route path="/:groupId" component={GroupDetails} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
