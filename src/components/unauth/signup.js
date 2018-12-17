import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Box, Button, Column, Divider, Heading, Label, Switch, Text, TextField } from 'gestalt';
import AuthService from '../auth-service';

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
              {touched ? error : ''}
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
    const res = await authService.signup(values);
    if (res) {
      this.props.history.push('/');
    }
  }

  render() {
    const { handleSubmit } = this.props;

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
          label="Enable encryption"
          name="useEncryption"
          component={this.renderSwitch}
        />
        {<div>
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
          />
        </Box>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signup'
})(
  connect()(Signup)
);