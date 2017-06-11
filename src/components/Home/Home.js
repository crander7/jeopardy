import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Home
 * @description Description of what this component does goes here.
 */
class Home extends Component {
    render() {
        return (
            <div className="home">Hello World</div>
        );
    }
}

/**
 * propTypes
 * @type {object}
 * @property {type} description
 */
Home.propTypes = {
    someprop: PropTypes.string
};
export default Home;
