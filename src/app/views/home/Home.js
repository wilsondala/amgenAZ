// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import AnimatedView from '../../components/animatedView/AnimatedView';

class Home extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // views:
    currentView: PropTypes.string.isRequired,
    enterHome: PropTypes.func.isRequired,
    leaveHome: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    return (
      <AnimatedView>
        <div className="uk-container uk-container-center">
            <div id="homeAmgen" >
              <img className='logoHome' />
            </div>
        </div>
      </AnimatedView>
    );
  }
}

export default Home;
