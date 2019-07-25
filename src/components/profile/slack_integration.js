import React, { Component } from 'react';
import { Box, Button, Heading, Text } from 'gestalt';

const INTEGRATION_URL = 'https://slack.com/oauth/authorize?';
export const REDIRECT_URL = process.env.NODE_ENV === 'production' ? 'https%3A%2F%2Fprogress-svc.herokuapp.com' : 'http%3A%2F%2Flocalhost%3A5000' + '%2Fprofile%2Fslack_redirect';

class SlackIntegration extends Component {

  handleAddIntegration() {
    window.location.assign(`${INTEGRATION_URL}scope=identity.basic&client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${process.env.REACT_APP_SLACK_STATE}`);
  }

  render() {
    const isEncryptionEnabled = localStorage.getItem('is_encryption_enabled') === 'true';

    return (
      <div>
      <Box paddingY={2}>
        <Heading size="xs">Slack Integration</Heading>
      </Box>
      <Text>Fill in your daily entries via text your workplace's slack.</Text>
      <Box paddingY={2}>
        {isEncryptionEnabled && (
          <div>
            <Text color="red">Sorry, adding slack to an encrypted account is still under development. Check back soon!</Text>
          </div>
        )}
        {!isEncryptionEnabled && (
          <Button
            text="Add Slack Integration"
            onClick={this.handleAddIntegration}
            color="red"
            inline
          />
        )}
      </Box>
      </div>
    );
  }
}

export default SlackIntegration;