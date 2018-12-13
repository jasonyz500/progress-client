import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, IconButton, Label, Text, TextField } from 'gestalt';

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
    console.log(data);
    alert('Not yet implemented');
  }

  render() {
    const { user } = this.state;
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
          <form onSubmit={this.handleEditPassword.bind(this)}>
            <Box paddingY={2} display="flex" alignItems="center">
              <Column span={4}>
                <Label htmlFor="currentPassword">
                  <Text align="left" bold>
                    Current Password
                  </Text>
                </Label>
              </Column>
              <Column span={8}>
                <Box display="flex" direction="row">
                  <Box flex="grow">
                    <TextField
                      id="currentPassword"
                      type="password"
                      onChange={() => undefined}
                    />
                  </Box>
                </Box>
              </Column>
            </Box>
            <Box paddingY={2} display="flex" alignItems="center">
              <Column span={4}>
                <Label htmlFor="newPassword">
                  <Text align="left" bold>
                    New Password
                  </Text>
                </Label>
              </Column>
              <Column span={8}>
                <Box display="flex" direction="row">
                  <Box flex="grow">
                    <TextField
                      id="newPassword"
                      type="password"
                      onChange={() => undefined}
                    />
                  </Box>
                </Box>
              </Column>
            </Box>
            <Box paddingY={2} display="flex" alignItems="center">
              <Column span={4}>
                <Label htmlFor="confirmNewPassword">
                  <Text align="left" bold>
                    Confirm New Password
                  </Text>
                </Label>
              </Column>
              <Column span={8}>
                <Box display="flex" direction="row">
                  <Box flex="grow">
                    <TextField
                      id="confirmNewPassword"
                      type="password"
                      onChange={() => undefined}
                    />
                  </Box>
                </Box>
              </Column>
            </Box>
            <Divider />
            <Box display="flex" direction="row" marginTop={2}>
              <Button
                color="white"
                text="Forgot Password?"
                inline
              />
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

export default connect(mapStateToProps)(EditPassword);