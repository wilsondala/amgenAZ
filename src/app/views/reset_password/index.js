// @flow weak

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAuthActions   from '../../redux/modules/userAuth';
import ResetPassword from './ResetPassword';

const mapStateToProps = (state) => {
    return {
        // views:
        currentView: state.views.currentView,
        isFetching: state.userAuth.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            ...userAuthActions
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
