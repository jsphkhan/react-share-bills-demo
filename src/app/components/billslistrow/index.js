import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import monthUtil from '../../utils/monthutil';
import BillsListDetails from '../billslistdetails';
import './styles.css';

export default class BillsListRow extends PureComponent {
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
        return `${monthUtil[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${date.toLocaleTimeString()}`;
    }
    whoPaid(bill) {
        //console.log(bill);

        if(bill.paidBy.toLowerCase() === 'you') {
            return `You Paid: ${this.props.currency}${parseInt(bill.amount).toFixed(2)}`;
        }
        return `You Paid: ${this.props.currency}0`;
    }
    whoOws(bill) {
        const members = this.props.members,
              dividedAmount = parseInt(bill.amount/members.length).toFixed(2);
        //console.log(bill.amount/members.length);

        if(bill.paidBy.toLowerCase() === 'you') {
            return `You Owe: ${this.props.currency}${dividedAmount}`;
        }
        return `You Owe: ${this.props.currency}${dividedAmount}`;
    }
    handleRowClick() {
        this.setState({showDetails: !this.state.showDetails});
    }
    render() {
        let {bill, members, currency} = this.props;
        return (
            <li className="list-row" onClick={this.handleRowClick}>
                <p className="lead list-row-title">{bill.description}</p>
                {(!this.state.showDetails) ? (
                    <div className="row">
                        <p className="col-sm-12 col-md-6 text-secondary">{this.whoPaid(bill)}</p>
                        <p className="col-sm-12 col-md-6 text-secondary">{this.whoOws(bill)}</p>
                    </div>
                ) : (null)}
                
                <p className="text-secondary">{this.parseDate(bill.created)}</p>
                
                {this.state.showDetails ? (
                    <BillsListDetails 
                        bill={bill} 
                        members={members} 
                        currency={currency}/>
                ) : null}
                
            </li>
        );
    }
}

BillsListRow.propTypes = {
    members: PropTypes.array.isRequired,
    bill: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired
}