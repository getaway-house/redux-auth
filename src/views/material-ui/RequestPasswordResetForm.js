import React, { PropTypes } from "react";
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import {
  requestPasswordResetFormUpdate,
  requestPasswordReset
} from "../../actions/request-password-reset";

@connect(({auth}) => ({auth}))
class RequestPasswordResetForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      submit: PropTypes.object
    })
  }

  static defaultProps = {
    inputProps: {
      email: {},
      submit: {}
    }
  }

  handleInput (key, val) {
    this.props.dispatch(requestPasswordResetFormUpdate(key, val));
  }

  handleSubmit () {
    let formData = this.props.auth.getIn(["requestPasswordReset", "form"]).toJS();
    this.props.dispatch(requestPasswordReset(formData, this.props.endpoint));
  }

  render () {
    let loading = this.props.auth.getIn(["requestPasswordReset", "loading"]);
    let inputDisabled = this.props.auth.getIn(["user", "isSignedIn"]);
    let submitDisabled = !this.props.auth.getIn(["requestPasswordReset", "form", "email"]);

    return (
      <form
        className='redux-auth request-password-reset-form clearfix'
        onSubmit={this.handleSubmit.bind(this)}>

        <Input
          type="text"
          label="Email Address"
          className="request-password-reset-email"
          placeholder="Email Address"
          disabled={loading || inputDisabled}
          value={this.props.auth.getIn(["requestPasswordReset", "form", "email"])}
          errors={this.props.auth.getIn(["requestPasswordReset", "errors", "email"])}
          onChange={this.handleInput.bind(this, "email")}
          {...this.props.inputProps.email} />

        <ButtonLoader
          loading={loading}
          type="submit"
          icon={<Glyphicon glyph="lock" />}
          className="pull-right request-password-reset-submit"
          disabled={inputDisabled || submitDisabled}
          onClick={this.handleSubmit.bind(this)}
          {...this.props.inputProps.submit}>
          Request Password Reset
        </ButtonLoader>
      </form>
    );
  }
}

export default RequestPasswordResetForm;