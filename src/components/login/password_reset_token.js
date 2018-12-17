import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Box, Button, Heading, Text, TextField } from 'gestalt';
import axios from 'axios';
import { ROOT_URL } from '../../actions/utils';

const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

class PasswordResetToken extends Component {

  handleSubmit({ password: { value }}) {
    axios.post(`${ROOT_URL}/auth/reset_password_token`, { password: value, token: this.props.match.params.token }, CONFIG)
      .then(() => {
        alert('Successfully changed password!');
        this.props.history.push('/');
      });
  }

  renderField(field) {
    // delete the event field, otherwise react logs a warning about event nullification
    delete field.input.value.event;
    const { meta: { touched, error } } = field;

    return (
      <div>
        <TextField
          id={field.input.name}
          type="password"
          {...field.input}
          value={field.input.value.value || ''}
        />
        <Text size="sm" color="red">{touched ? error : ''}</Text>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Box>
        <Box paddingY={2}><Heading size="sm">Reset Your Password</Heading></Box>
        <Box paddingY={2}><Text>Please enter a new password to reset your login credentials.</Text></Box>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <Box paddingY={1}>
            <Field
              name="password"
              component={this.renderField}
            />
          </Box>
          <Box marginBottom={2}>
            <Field
              name="confirmPassword"
              component={this.renderField}
            />
          </Box>
          <Button
            text="Submit"
            color="red"
            type="submit"
            inline
          />
        </form>
      </Box>
    );
  }
}

function validate({ password, confirmPassword }) {
  const errors = {};
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    errors.confirmPassword = "Error: new password and confirm new password don't match.";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'resetPasswordForm'
})(
  connect()(PasswordResetToken)
);