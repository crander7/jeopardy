import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Creator
 * @description Description of what this component does goes here.
 */
class Creator extends Component {
    render() {
        return (
            <div className="creator">Name</div>
        );
    }
}

/**
 * propTypes
 * @type {object}
 * @property {type} description
 */
Creator.propTypes = {
    someprop: PropTypes.string
};
export default Creator;
