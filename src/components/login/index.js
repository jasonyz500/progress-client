import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import { Box, Button, Column, Label, Text, TextField } from 'gestalt';
import _ from 'lodash';
import AuthService from '../auth-service';

const authService = new AuthService();

class Login extends Component {

  componentWillMount(){
    if (authService.isLoggedIn()) {
      this.props.history.replace('/');
    }
  }

  async login(values) {
    const email = _.get(values, 'email.value');
    const password = _.get(values, 'password.value');
    const res = await authService.login(email, password);
    if(res) {
      this.props.history.replace(this.props.location.pathname);
    } else {
      alert('Invalid Credentials. Please try again.');
    }
  }

  renderField(field) {
    // delete the event field, otherwise react logs a warning about event nullification
    delete field.input.value.event;
    const { meta: { touched, error } } = field;

    return (
      <Box paddingY={2} display="flex" alignItems="center">
        <Column span={4}>
          <Label htmlFor={field.input.name}>
            <Text align="left" bold>
              {field.label}
            </Text>
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

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div>
        <h2>Please log in to continue.</h2>
        <form onSubmit={handleSubmit(this.login.bind(this))}>
          <Field
            label="Email"
            name="email"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            component={this.renderField}
          />
          <Box display="flex" direction="row">
            <Button
              text="Login"
              type="submit"
              color="red"
              inline
              disabled={submitting}
            />
            <Box paddingX={1}>
              <Link to="/password_reset">
                <Button text="Forgot Password?" inline/>
              </Link>
            </Box>
          </Box>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'loginPageForm'
})(
  withRouter(Login)
);