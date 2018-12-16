import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Box, Button, Heading, Text, TextField } from 'gestalt';

class PasswordReset extends Component {

  handleSubmit({ email: { value }}) {
    console.log(value);
  }

  renderField(field) {
    // delete the event field, otherwise react logs a warning about event nullification
    delete field.input.value.event;
    const { meta: { touched, error } } = field;

    return (
      <div>
        <TextField
          id={field.input.name}
          placeholder="email"
          {...field.input}
          value={field.input.value.value || ''}
        />
        <Text size="xs">{touched ? error : ''}</Text>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Box>
        <Box paddingY={2}><Heading size="sm">Password reset</Heading></Box>
        <Box paddingY={2}><Text>Forgotten your password? Enter your account's email address below, 
        and we'll email you instructions for setting a new one.</Text></Box>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <Box paddingY={2}>
            <Field
              name="email"
              component={this.renderField}
            />
          </Box>
          <Button
            text="Send email"
            color="red"
            type="submit"
            inline
          />
        </form>
      </Box>
    );
  }
}

export default reduxForm({
  form: 'resetPasswordForm'
})(connect()(PasswordReset)
);