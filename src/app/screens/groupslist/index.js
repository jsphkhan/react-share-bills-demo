import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

class GroupsListInner extends Component {
    render() {
        let {allGroups} = this.props.groupsReducer;
        return (
            <div className="groups-list-container">
                <p className="lead groups-list-title">All Groups</p>
                <ul>
                    {allGroups.map((group, index) => {
                        return (
                            <Link key={index} to={{pathname: `/${group}`}}>
                                <li className="groups-list-row">
                                    {this.props.groupsReducer[group].title}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        groupsReducer: state.groupsReducer
    }
}
let GroupsList = connect(mapStateToProps, null)(GroupsListInner);
export default GroupsList;