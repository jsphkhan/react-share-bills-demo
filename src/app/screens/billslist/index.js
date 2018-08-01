import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';
import monthUtil from '../../utils/monthutil';

class BillsListInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
        this.handleRowClick = this.handleRowClick.bind(this);
        //console.log(this.props.groupId);
    }
    parseDate(timestamp) {
        let date = new Date(timestamp);
        return `${date.getDate()} ${monthUtil[date.getMonth()]}, ${date.getFullYear()}`;
    }
    whoPaid(bill) {
        //console.log(bill);

        if(bill.paidBy.toLowerCase() === 'you') {
            return `You Paid: ${parseInt(bill.amount).toFixed(2)}`;
        }
        return `You Paid: 0`;
    }
    whoOws(bill) {
        const members = this.props.groupsReducer[this.props.groupId].members,
              dividedAmount = parseInt(bill.amount/members.length).toFixed(2);
        //console.log(bill.amount/members.length);

        if(bill.paidBy.toLowerCase() === 'you') {
            return `You Lent: ${dividedAmount}`;
        }
        return `You Owe: ${dividedAmount}`;
    }
    handleRowClick() {
        this.setState({showDetails: !this.state.showDetails});
    }
    render() {
        let {billsReducer, groupId} = this.props;
        return (
            <div className="bills-list-container">
                <ul>
                    {billsReducer[groupId].bills.map(((bill, index) => {
                        return (
                            <li className="list-row" key={index} onClick={this.handleRowClick}>
                                <p className="lead list-row-title">{bill.description}</p>
                                {(!this.state.showDetails) ? (
                                    <div className="row">
                                        <p className="col-sm-12 col-md-6 text-secondary">{this.whoPaid(bill)}</p>
                                        <p className="col-sm-12 col-md-6 text-secondary">{this.whoOws(bill)}</p>
                                    </div>
                                ) : (null)}
                                
                                <p className="text-secondary">{this.parseDate(bill.created)}</p>
                                
                                {this.state.showDetails ? (
                                    <div className="list-row-details">
                                        <div className="row">
                                            <p className="col-sm-12 text-secondary">{this.whoPaid(bill)}</p>
                                            <p className="col-sm-12 text-secondary">{this.whoOws(bill)}</p>
                                        </div>
                                    </div>
                                ) : null}
                                
                            </li>
                        );
                    }))}
                </ul>
            </div>
        );
    }
}
BillsListInner.propTypes = {
    groupId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        billsReducer: state.billsReducer,
        groupsReducer: state.groupsReducer
    }
}
let BillsList = connect(mapStateToProps, null)(BillsListInner);
export default BillsList;