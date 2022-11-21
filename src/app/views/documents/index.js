// @flow weak

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';


import Documents from './Documents';

const mapStateToProps = (state) => {
   // console.log("STATE: ", state);
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents);
