import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Divider, Heading } from 'gestalt';
import { getProfile } from '../../actions';
import EditPassword from './edit_password';
import EncryptionSettings from './encryption_settings';

class Profile extends Component {

  componentDidMount() {
    this.props.getProfile();
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
        <EncryptionSettings />
			</div>
		);
	}
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { getProfile })(Profile);