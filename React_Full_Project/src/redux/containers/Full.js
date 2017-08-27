import React, { Component } from 'react';
import { connect } from 'react-redux';

import Full from '../../containers/Full/';

import { LOGIN_SUCCESS } from '../constants/auth';
import Auth from '../Auth';

class FullContainer extends Component {
    componentDidMount() {
        const { localLogin } = this.props;
        const user = Auth.getUser();
        if (user) {
            localLogin(user);
        }
    }

    render() {
        return (
            <Full {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch) => ({
    localLogin: (user) => dispatch({
        type: LOGIN_SUCCESS,
        local: true,
        response: {
            user,
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullContainer);
