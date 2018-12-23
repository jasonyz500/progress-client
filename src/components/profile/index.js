import React, { Component } from 'react';
import { Box, Divider, Heading } from 'gestalt';
import EditPassword from './edit_password';
import EncryptionSettings from './encryption_settings';

class Profile extends Component {

	render() {
		return (
			<div>
				<Box marginBottom={2}>
          <Heading size="sm">Account Settings</Heading>
        </Box>
        <Divider />
        <EditPassword />
        <Divider />
        <EncryptionSettings />
			</div>
		);
	}
}

export default Profile;