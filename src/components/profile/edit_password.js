import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Box, Button, Column, Divider, IconButton, Label, Text, TextField } from 'gestalt';
import { editPassword } from '../../actions';

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
      },
      showEditEmail: false,
      showEditPassword: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({ user: nextProps.user }));
  }

  toggleEditPassword() {
    this.setState(() => ({ showEditPassword: !this.state.showEditPassword }));
  }

  handleEditPassword(data) {
    this.props.editPassword(data.currentPassword.value, data.newPassword.value, (res) => {
      alert('Successfully changed password.');
    });
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
                type="password"
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
    const { user } = this.state;
    const { handleSubmit, pristine, submitting } = this.props; // included in redux-form
    return (
      <div>
      <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
        <Column span={4}>
          <Label htmlFor="email">
            <Text align="left" bold>
              Email
            </Text>
          </Label>
        </Column>
        <Column span={8}>
          <Box display="flex" direction="row">
            <Box flex="grow">
              <TextField
                disabled
                id="email"
                onChange={() => undefined}
                value={user.email}
              />
            </Box>
          </Box>
        </Column>
      </Box>
      <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
        <Column span={4}>
          <Label htmlFor="password">
            <Text align="left" bold>
              Password
            </Text>
          </Label>
        </Column>
        <Column span={8}>
          <Box display="flex" direction="row">
            <Box flex="grow">
              <TextField
                disabled
                id="password"
                onChange={() => undefined}
                value="************"
              />
            </Box>
            <IconButton
              accessibilityLabel="Edit Email"
              icon={this.state.showEditPassword ? "cancel" : "edit"}
              iconColor="red"
              onClick={this.toggleEditPassword.bind(this)}
            />
          </Box>
          {this.state.showEditPassword && (
          <Box color="lightWash" paddingY={2} paddingX={4}>
          <form onSubmit={handleSubmit(this.handleEditPassword.bind(this))}>
            <Field
              label="Current Password"
              name="currentPassword"
              component={this.renderField}
            />
            <Field
              label="New Password"
              name="newPassword"
              component={this.renderField}
            />
            <Field
              label="Confirm New Password"
              name="confirmNewPassword"
              component={this.renderField}
            />
            <Divider />
            <Box display="flex" direction="row" marginTop={2}>
              <Link to="/password_reset">
                <Button
                  color="white"
                  text="Forgot Password?"
                  inline
                />
              </Link>
              <Box flex="grow"></Box>
              <Box marginRight={1}>
                <Button
                  text="Cancel"
                  color="white"
                  onClick={this.toggleEditPassword.bind(this)}
                  inline
                />
              </Box>
              <Button
                text="Save"
                type="submit"
                color="red"
                inline
                disabled={pristine || submitting}
              />
            </Box>
          </form>
          </Box>
          )}
        </Column>
      </Box>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function validate(values) {
  const errors = {};
  if (!values.currentPassword) {
    errors.currentPassword = 'Please enter your current password.';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Please enter a new password.';
  }
  if (values.newPassword && values.confirmNewPassword && values.newPassword.value !== values.confirmNewPassword.value) {
    errors.confirmNewPassword = "New password and confirm new password don't match.";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'changePasswordForm'
})(
  connect(mapStateToProps, { editPassword })(EditPassword)
);