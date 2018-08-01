import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class ModalDialog extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        const {children, show, onClose, title} = this.props;
        if(!show) {
            return null;
        }
        return (
            <div className="modal-background">
                <div className="modal-box">
                    <div className="modal-box-header">
                        <p className="text-primary text-center lead">{title}</p>
                        <a onClick={onClose} className="modal-close-btn">Close</a>
                    </div>
                    <div className="modal-box-content">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

ModalDialog.propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}