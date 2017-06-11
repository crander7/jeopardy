import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import config from '../../config';

export class AppComponent extends Component {
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        const { loading } = this.props.files;
        return (
            <div>
                <Helmet {...config.app.head} />
                <div className="nav-container">
                    <div className="nav-list">
                        <Link to="/" style={loading ? { pointerEvents: 'none' } : {}}>
                            <img src="/images/logo.png" alt="jeopardy-logo" width="50" height="50" />
                        </Link>
                        <Link to="/create-game" style={loading ? { pointerEvents: 'none' } : {}}>
                            <div className="nav-list-item">Create</div>
                        </Link>
                        <Link to="/play" style={loading ? { pointerEvents: 'none' } : {}}>
                            <div className="nav-list-item">Play</div>
                        </Link>
                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

AppComponent.propTypes = {
    user: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    files: PropTypes.object
};

const mapStateToProps = state => state;

const App = connect(
    mapStateToProps
)(AppComponent);

AppComponent.contextTypes = {
    store: PropTypes.object.isRequired
};

export default App;
