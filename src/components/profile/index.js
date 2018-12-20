import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, Heading } from 'gestalt';
import { getProfile } from '../../actions';
import EditPassword from './edit_password';
import AuthService from '../auth-service';

const authService = new AuthService();

class Profile extends Component {

  componentDidMount() {
    this.props.getProfile();
  }

  handleAddEncryption() {

  }

	render() {
    const { user } = authService.getProfile();
		return (
			<Box>
				<Box padding={2}><Heading size="sm">Account Settings</Heading></Box>
        <Divider />
        <Column span={12}>
          <EditPassword />
          <Divider />
          <Box padding={2}><Heading size="xs">Encryption</Heading></Box>
          {!user.is_encryption_enabled && (
            <Button
              text="Add E2E Encryption"
              onClick={this.handleAddEncryption}
              color="red"
              inline
            />
          )}
        </Column>
			</Box>
		);
	}
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { getProfile })(Profile);