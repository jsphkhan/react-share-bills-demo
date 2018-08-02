import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class NoData extends PureComponent {
    static defaultProps = {
        message: 'No Data'
    }
    render() {
        return (
            <div className="no-data-container">   
                <p className="lead text-secondary">{this.props.message}</p>
            </div>
        );
    }
}

NoData.propTypes = {
    message: PropTypes.string.isRequired
}