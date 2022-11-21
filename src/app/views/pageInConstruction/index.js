// @flow weak

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions from '../../redux/modules/views';
import * as userAuthActions   from '../../redux/modules/userAuth';
import PageInConstructionFormHandler from './PageInConstructionFormHandler';

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
            enterPageInConstruction: viewsActions.enterPageInConstruction, 
            leavePageInConstruction: viewsActions.leavePageInConstruction,
            ...userAuthActions
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageInConstructionFormHandler);
