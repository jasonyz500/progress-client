import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, Heading, Text } from 'gestalt';
import { getProfile } from '../../actions';
import EditPassword from './edit_password';

class Profile extends Component {

  componentDidMount() {
    this.props.getProfile();
  }

  handleAddEncryption() {

  }

	render() {
    const { user } = this.props;
		return (
			<div>
				<Box marginBottom={2}>
          <Heading size="sm">Account Settings</Heading>
        </Box>
        <Divider />
        <EditPassword />
        <Divider />
        <Box paddingY={2}>
          <Heading size="xs">Encryption</Heading>
        </Box>
        <Text>Protect your privacy by encrypting and decrypting your posts in your browser.</Text>
        <Text>Your encryption key will not be stored in our database or transferred across the internet, so nobody else can ever read your data.</Text>
        <Text>This also means that if you lose your key, we cannot help you recover it, so store it carefully!</Text>
        <Box paddingY={2}>
          {!user.is_encryption_enabled && (
            <div>
              <Button
                text="Add E2E Encryption"
                onClick={this.handleAddEncryption}
                color="red"
                inline
                disabled
              />
              <Text color="red">Sorry, adding encryption to an unencrypted account is still under development. Check back soon!</Text>
            </div>
          )}
          {user.is_encryption_enabled && (
            <div>
              
            </div>
          )}
        </Box>
			</div>
		);
	}
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { getProfile })(Profile);