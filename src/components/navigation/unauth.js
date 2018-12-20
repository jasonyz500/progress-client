import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import { Button } from 'gestalt';
import { FormControl, FormGroup, Navbar } from 'react-bootstrap';
import AuthService from '../auth-service';

const authService = new AuthService();

class UnauthNavigation extends Component {

  async login({ navEmail, navPassword }) {
    const res = await authService.login(navEmail, navPassword);
    if(res) {
      this.props.history.push('/');
    } else {
      this.props.history.push('/login');
    }
  }

  renderField(field) {
    // delete the event field, otherwise react logs a warning about event nullification
    delete field.input.value.event;

    return (
      <FormControl
        type={field.type || 'text'}
        {...field.input}
        value={field.input.value}
      />
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Progress</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
          <FormGroup>
          <form onSubmit={handleSubmit(this.login.bind(this))}>
            <Field
              name="navEmail"
              component={this.renderField}
            />
            <Field
              name="navPassword"
              type="password"
              component={this.renderField}
            />
            <Button
              text="Login"
              type="submit"
              color="red"
              inline
              size="sm"
            />
          </form>
          </FormGroup>
        </Navbar.Form>
      </Navbar>
    );
  }
}

export default reduxForm({
  form: 'navbarLoginForm'
})(
  withRouter(UnauthNavigation)
);