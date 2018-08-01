import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBillAction } from '../../redux/actions';
import './styles.css';

class AddBillInner extends Component {
    constructor(props) {
      super(props);
      //event bindings
      this.submitBill = this.submitBill.bind(this);
      //refs
      this.descriptionRef = React.createRef();
      this.amountRef = React.createRef();
      this.paidByRef = React.createRef();
    }
    validate() {
      //amount cannot be -ve
      //amount field has to have numbers
      //all fields should not be empty
    }
    submitBill() {
      //console.log('validate', this.descriptionRef.current.value, this.amountRef.current.value, this.paidByRef.current.value);
      //dispatch an action to add the bill
        if(this.amountRef.current.value && (this.amountRef.current.value > 0) && this.descriptionRef.current.value && this.paidByRef.current.value) {
            let data = {
                groupId: this.props.groupId,
                amount: this.amountRef.current.value,
                description: this.descriptionRef.current.value,
                paidBy: this.paidByRef.current.value,
                created: Date.now()
            }
            this.props.addBillAction(data);
            //close the modal
            /* 
            Note: I could have used Redux Thunk Middleware library here
            to perform async actions. So once addBillAction has performed
            then close the modal. But for simplicity I am going for sync
            execution
            */
            this.props.onClose();
        } else {
            console.warn('Empty fields not allowed');
        }
    }
    render() {
        let {groupName, groupMembers} = this.props;
        return (
          <div className="form-box">
            <p className="lead text-center group-name">{groupName.toUpperCase()}</p>
            <div className="form-body">
                <div className="form-group">
                <label className="text-secondary">Description</label>
                <textarea
                    className="form-control"
                    onChange={() => {}}
                    ref={this.descriptionRef}
                />
                </div>
                <div className="form-group">
                <label className="text-secondary">Amount</label>
                <input
                    type="number" 
                    className="form-control"
                    ref={this.amountRef}
                />
                </div>
                <div className="form-group">
                <label className="text-secondary">Paid By</label>
                <select className="form-control" ref={this.paidByRef}>
                    {groupMembers.map((member, index) => {
                    return (<option key={index} value={member}>{member}</option>);
                    })}
                </select>
                </div>
                <div className="form-group">
                <button 
                    className="btn btn-primary btn-block"
                    onClick={this.submitBill}>Save</button>
                </div>
            </div>
          </div>
        );
    }
}
AddBillInner.propTypes = {
  groupMembers: PropTypes.array.isRequired,
  groupName: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBillAction: (data) => {
      dispatch(addBillAction(data));
    }
  }
}
let AddBill = connect(null, mapDispatchToProps)(AddBillInner);
export default AddBill;