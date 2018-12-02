import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, Divider, Heading, IconButton, Label, Text, TextField } from 'gestalt';
import { getProfile } from '../../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditEmail: false,
      showEditPassword: false
    }
  }

  componentDidMount() {
    this.props.getProfile();
  }

  handleEditEmail() {

  }

  handleEditPassword() {

  }

  handleEncryption() {

  }

	render() {
    const { user } = this.props;
		return (
			<Box>
				<Box padding={2}><Heading size="sm">Account Settings</Heading></Box>
        <Divider />
        <Column span={12}>
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
                <IconButton
                  accessibilityLabel="Edit Email"
                  icon="edit"
                  iconColor="red"
                  onClick={this.handleEditEmail}
                />
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
                  icon="edit"
                  iconColor="red"
                  onClick={this.handleEditPassword}
                />
              </Box>
            </Column>
          </Box>
          <Divider />
          <Box padding={2}><Heading size="xs">Encryption</Heading></Box>

        </Column>
			</Box>
		);
	}
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { getProfile })(Profile);