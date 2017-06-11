import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * <%= pascalEntityName %>
 * @description Description of what this component does goes here.
 */
export class <%= pascalEntityName %>Component extends Component {
    render() {
        return (
            <div className="<%= dashesEntityName %>"><%= pascalEntityName %></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

/**
 * propTypes
 * @type {object}
 * @property {type} description
 */
<%= pascalEntityName %>Component.propTypes = {};

const <%= pascalEntityName %> = connect(
    mapStateToProps
)(<%= pascalEntityName %>Component);

export default <%= pascalEntityName %>;
