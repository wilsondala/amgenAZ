import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';

class FlashMessage extends Component {

  constructor(props) {
    super(props);

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.state = {visible: props.flash ? props.flash.visible : false};
  }

  handleAlertDismiss() {
    this.setState({visible: false});
    this.props.flash.visible = false;
  }

  getFlashType(type) {
    switch (type) {
    case 'danger':
      return 'uk-alert-danger';
    case 'warning':
      return 'uk-alert-warning';
    default:
      return 'uk-alert-success';
    }
  }

  renderElement() {
    const { flash, ...props } = this.props;

    if(flash.visible) {
      return (
        <div className={`uk-alert ${this.getFlashType(flash.kind)}`} data-uk-alert>
          <a href="" className="uk-alert-close uk-close uk-hidden"/>
          <p>{flash.message}</p>
        </div>
      );
    }

    return <span/>;
  }

  render() {
    return (
      <div>
        {this.renderElement()}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  flash: PropTypes.object.isRequired
};

FlashMessage.defaultProps  = {
  flash: {
    kind: 'success',
    message: '',
    visible: false
  }
};

export default FlashMessage;
