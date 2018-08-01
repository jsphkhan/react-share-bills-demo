import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalDialog from '../../components/modaldialog';
import AddBill from '../addbill';
import BillsList from '../billslist';
import './styles.css';

class GroupDetailsInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            groupName: '',
            groupCreated: '',
            groupMembers: [],
            groupId: this.props.match.params.groupId
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount() {
        let groupId = this.props.match.params.groupId;
        this.updateState(groupId);
    }
    updateState(groupId) {
        let {groupsReducer} = this.props;
        this.setState({
            groupName: groupsReducer[groupId].title,
            groupCreated: groupsReducer[groupId].createdOn,
            groupMembers: groupsReducer[groupId].members,
            groupId: groupId
        });
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.match.params.groupId);
        let groupId = nextProps.match.params.groupId;
        this.updateState(groupId);
    }
    handleClick() {
        this.setState({showModal: true});
    }
    handleClose() {
        this.setState({showModal: false});
    }
    render() {
        const {groupName, groupCreated, showModal} = this.state;
        return (
            <div className="group-details-container">
                <div className="group-details-header">
                    <div>
                        <p className="lead">{groupName}</p>
                        <p className="text-secondary">Created At: {(new Date(groupCreated)).toDateString()}</p>
                    </div>
                    <button 
                        className="btn btn-primary"
                        onClick={this.handleClick}>Add Bill</button>
                </div>
                <BillsList groupId={this.state.groupId}/>
                <ModalDialog show={showModal} onClose={this.handleClose} title="Add Bill">
                    <AddBill 
                        groupMembers={this.state.groupMembers}
                        groupName={this.state.groupName}
                        groupId={this.state.groupId}
                        onClose={this.handleClose}/>
                </ModalDialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        groupsReducer: state.groupsReducer
    }
}
let GroupDetails = connect(mapStateToProps, null)(GroupDetailsInner);
export default GroupDetails;