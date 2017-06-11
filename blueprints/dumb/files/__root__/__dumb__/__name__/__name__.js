import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * <%= pascalEntityName %>
 * @description Description of what this component does goes here.
 */
class <%= pascalEntityName %> extends Component {
    render() {
        return (
            <div className="<%= dashesEntityName %>"><%= pascalEntityName %></div>
        );
    }
}

/**
 * propTypes
 * @type {object}
 * @property {type} description
 */
<%= pascalEntityName %>.propTypes = {
    someprop: PropTypes.string
};
export default <%= pascalEntityName %>;
