// @flow weak

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions from '../../redux/modules/views';
import * as userAuthActions   from '../../redux/modules/userAuth';
import RedefinePasswordFormHandler from './RedefinePasswordFormHandler';

const mapStateToProps = (state) => {
    return {
        // views:
        currentView: state.views.currentView
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            // views
            enterRedefinePasswordForm: viewsActions.enterRedefinePasswordForm, 
            leaveRedefinePasswordForm: viewsActions.leaveRedefinePasswordForm,
            ...userAuthActions
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RedefinePasswordFormHandler);
