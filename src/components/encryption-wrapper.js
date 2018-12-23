import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Box, Button, Column, Heading, Label, Modal, Spinner, Text, TextField } from 'gestalt';
import { getProfile } from '../actions';
import Main from './main';
import _ from 'lodash';

class EncryptionWrapper extends Component {

  componentDidMount() {
    this.props.getProfile();
  }

  handleSubmit(data) {
    localStorage.setItem('encryption_key', data.value);
    window.location.reload();
  }

  shouldShow(user) {
    return user.is_encryption_enabled && !localStorage.getItem('encryption_key');
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
    const { handleSubmit, user } = this.props;
    if (_.isEmpty(user)) {
      return (
        <div>
          <Heading size="sm">Loading data...</Heading>
          <Spinner show={true} accessibilityLabel="Loading" />
        </div>
      );
    }
    return (
      <div>
        {this.shouldShow(user) &&
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="Enter encryption key"
            heading="Enter Encryption Key"
            role="alertdialog"
            size="md"
          >
            <Box padding={4}>
              <Text>We've detected that you enabled encryption on your posts,
               but we couldn't find your encryption key on this computer. Please re-enter it to decrypt your posts.</Text>
              <br />
              {user.encryption_hint &&
                <Text>Your encryption hint is: <b>{user.encryption_hint}</b></Text>
              }
              <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <Field
                  label="Encryption Key"
                  name="encryptionKey"
                  component={this.renderField}
                />
                <Box display="flex" direction="row">
                  <Box flex="grow"></Box>
                  <Button
                    text="Continue"
                    type="submit"
                    color="red"
                    inline
                  />
                </Box>
              </form>
            </Box>
          </Modal>
        }
        {!this.shouldShow(user) && <Main />}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function validate(data) {
  const errors = {};
  if (!data.encryptionKey) {
    errors.encryptionKey = 'Field cannot be empty.';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'encryptionAlertForm'
})(
  connect(mapStateToProps, { getProfile })(EncryptionWrapper)
);