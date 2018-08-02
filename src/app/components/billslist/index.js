import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

import NoData from '../../components/nodata';
import BillsListRow from '../../components/billslistrow';

class BillsListInner extends PureComponent {
    render() {
        let {billsReducer, groupId, groupsReducer} = this.props;
        if(billsReducer[groupId].bills.length === 0) {
            return (<NoData message="No Bills Found. Why don't you create one?" />);
        }
        return (
            <div className="bills-list-container">
                <ul>
                    {billsReducer[groupId].bills.map(((bill, index) => {
                        return (
                            <BillsListRow 
                                members={groupsReducer[groupId].members}
                                bill={bill} 
                                key={index}
                                currency={groupsReducer.currency} />
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