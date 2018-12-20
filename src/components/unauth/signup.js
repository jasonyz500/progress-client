import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Box, Button, Column, Divider, Heading, Label, Switch, Text, TextField } from 'gestalt';
import AuthService from '../auth-service';
import _ from 'lodash';

const authService = new AuthService();

class Signup extends Component {

  componentWillMount(){
    if (authService.isLoggedIn()) {
      this.props.history.replace('/');
    }
  }

  renderTextField(field) {
    // delete the event field, otherwise react logs a warning about event nullification
    delete field.input.value.event;
    const { meta: { touched, error } } = field;

    return (
      <Box paddingY={2} display="flex" alignItems="center">
        <Column span={4}>
          <Label htmlFor={field.input.name}>
            <Text align="left" bold>{field.label}</Text>
          </Label>
        </Column>
        <Column span={8}>
          <Box display="flex" direction="row">
            <Box flex="grow">
              <TextField
                id={field.input.name}
                type={field.type || 'text'}
                {...field.input}
                value={field.input.value.value || ''}
              />
              <Text size="sm" color="red">{touched ? error : ''}</Text>
            </Box>
          </Box>
        </Column>
      </Box>
    );
  }

  renderSwitch(field) {
    return (
      <Box paddingY={2} display="flex" alignItems="center">
        <Column span={4}>
          <Label htmlFor={field.input.name}>
            <Text align="left" bold>{field.label}</Text>
          </Label>
        </Column>
        <Column span={8}>
          <Switch
            id={field.input.name}
            switched={field.input.value.value}
            {...field.input}
          />
        </Column>
      </Box>
    )
  }

  async submit(values) {
    const payload = {
      email: values.email.value,
      password: values.password.value,
      useEncryption: values.useEncryption && values.useEncryption.value,
      encryptionKey: values.encryptionKey && values.encryptionKey.value,
      encryptionKeyHint: values.encryptionKeyHint && values.encryptionKeyHint.value
    };
    const res = await authService.signup(payload);
    if (res) {
      this.props.history.push('/');
    } else {
      alert('There was an error signing up. You may not be on the whitelist for early access.');
    }
  }

  render() {
    const { handleSubmit, isEncryptionEnabled, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Box marginBottom={2}><Heading size="sm">Sign Up</Heading></Box>
        <Divider />
        <Field
          label="Email Address"
          name="email"
          component={this.renderTextField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderTextField}
        />
        <Field
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          component={this.renderTextField}
        />
        <Divider />
        <Box marginBottom={4} marginTop={2}>
          <Heading size="xs">Encryption (optional)</Heading>
          <Text>Protect your privacy by encrypting and decrypting your posts in your browser.</Text>
          <Text>Your encryption key will not be stored in our database, so nobody else can ever read your data.</Text>
          <Text>This also means that if you lose your key, we cannot help you recover it, so store it carefully!</Text>
        </Box>
        <Field
          label="Enable Encryption"
          name="useEncryption"
          component={this.renderSwitch}
        />
        {isEncryptionEnabled && isEncryptionEnabled.value && <div>
          <Text>Your key doesn't have to be as strong as your password. We recommend something short, simple, and memorable.</Text>
          <Field
            label="Encryption Key"
            name="encryptionKey"
            component={this.renderTextField}
          />
          <Text>We recommend adding a hint in case you forget your key. We will store the hint in our database.</Text>
          <Field
            label="Encryption Key Hint"
            name="encryptionKeyHint"
            component={this.renderTextField}
          />
        </div>}
        <Divider />
        <Box marginTop={2}>
          <Button
            text="Submit"
            type="submit"
            color="red"
            inline
            disabled={pristine || submitting}
          />
        </Box>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const email = _.get(values, 'email.value');
  const password = _.get(values, 'password.value');
  const confirmPassword = _.get(values, 'confirmPassword.value');
  const useEncryption = _.get(values, 'useEncryption.value');
  const encryptionKey = _.get(values, 'encryptionKey.value');
  if (!email) {
    errors.email = "Email is required.";
  }
  if (!password || password.length < 6) {
    errors.password = "Please choose a strong password of at least 6 characters.";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "New password and confirm new password don't match.";
  }
  if (useEncryption && !encryptionKey) {
    errors.encryptionKey = "Encryption key is required if you're using encryption.";
  }
  return errors;
}

const SignupForm = reduxForm({
  validate,
  form: 'signup'
})(Signup);

const selector = formValueSelector('signup');

export default connect(
  state => { 
    return { isEncryptionEnabled: selector(state, 'useEncryption') }
  }
)(SignupForm);