import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import config from '../../config';
import requestPermissions from '../../helpers/requestPermissions';

export class AppComponent extends Component {
    componentDidMount() {
        this.fetchPermissionsWhenStale();
    }

    componentDidUpdate() {
        this.fetchPermissionsWhenStale();
    }

    fetchPermissionsWhenStale() {
        const { user, location } = this.props;
        const { store } = this.context;
        if (!user.coded) {
            window.location.replace(config.services.accts.url + config.services.accts.login_path);
            return;
        }
        if (location.pathname === '/redirect') {
            return;
        }
        if (user.stale && !user.isLoading) {
            store.dispatch({
                type: 'USER_LOGGING_IN'
            });
            requestPermissions(user).then(
                 (data) => {
                     if (data.success) {
                         store.dispatch({
                             type: 'USER_CHECK',
                             payload: {
                                 decoded: user.decoded,
                                 coded: user.coded,
                                 permissions: user.permissions
                             }
                         });
                     } else {
                         store.dispatch({
                             type: 'USER_LOGGED_OUT'
                         });
                     }
                 },
                 (err) => {
                     store.dispatch({
                         type: 'USER_LOGGED_OUT',
                         err
                     });
                 }
             );
        }
    }


    render() {
        const { loading } = this.props.files;
        return (
            <div>
                <Helmet {...config.app.head} />
                <div className="nav-container">
                    <div className="nav-list">
                        <Link to="/" style={loading ? { pointerEvents: 'none' } : {}}>
                            <img src="/images/zefr-logo.svg" alt="zefr-logo" width="100" height="100" />
                        </Link>
                        <Link to="/" style={loading ? { pointerEvents: 'none' } : {}}>
                            <div className="nav-list-item">Upload</div>
                        </Link>
                        <Link to="/files" style={loading ? { pointerEvents: 'none' } : {}}>
                            <div className="nav-list-item">Files</div>
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
