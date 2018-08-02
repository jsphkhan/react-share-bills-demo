import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class BillsListDetails extends PureComponent {
    whoPaid(bill) {
        let paidBy = bill.paidBy,
            paidList = [],
            members = this.props.members,
            dividedAmount = parseInt(bill.amount/members.length).toFixed(2);
        
        let filterMembers = members.filter((member) => {
            return member.toLowerCase() !== paidBy.toLowerCase();
        });

        if(paidBy.toLowerCase() === 'you') {
            return (
                <ul className="list-row-details-list">
                    <li className="list-row-details-list-row"><p>You Paid: {this.props.currency}{parseInt(bill.amount).toFixed(2)} and owe {`${this.props.currency}${dividedAmount}`}</p></li>
                    {filterMembers.map((member, index) => {
                        return (<li className="list-row-details-list-row" key={index}><p className="text-secondary">{member} owes you {this.props.currency}{dividedAmount}</p></li>);
                    })}
                </ul>
            );
        } 
        return (
            <ul className="list-row-details-list">
                <li className="list-row-details-list-row">{paidBy} Paid: {this.props.currency}{parseInt(bill.amount).toFixed(2)} and owe {`${this.props.currency}${dividedAmount}`}</li>
                {filterMembers.map((member, index) => {
                    return (<li className="list-row-details-list-row" key={index}><p className="text-secondary">{member} {((member.toLowerCase() === 'you') ? 'owe' : 'owes')} {paidBy} {this.props.currency}{dividedAmount}</p></li>);
                })}
            </ul>
        );
    }
    render() {
        let {bill} = this.props;
        return (
            <div className="list-row-details">
                {this.whoPaid(bill)}
            </div>
        );
    }
}

BillsListDetails.propTypes = {
    members: PropTypes.array.isRequired,
    bill: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired
}