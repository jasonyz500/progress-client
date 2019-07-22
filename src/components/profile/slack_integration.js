import React, { Component } from 'react';
import { Box, Button, Heading, Text } from 'gestalt';

const INTEGRATION_URL = 'https://slack.com/oauth/authorize?';

class SlackIntegration extends Component {

  handleAddIntegration() {
    window.location.assign(`${INTEGRATION_URL}client_id=2156640555.646972247700&scope=chat:write:bot&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile%2Fslack_redirect`);
  }

  render() {
    return (
      <div>
      <Box paddingY={2}>
        <Heading size="xs">Slack Integration</Heading>
      </Box>
      <Text>Fill in your daily entries via text your workplace's slack.</Text>
      <Box paddingY={2}>
        <Button
          text="Add Slack Integration"
          onClick={this.handleAddIntegration}
          color="red"
          inline
        />
      </Box>
      </div>
    );
  }
}

export default SlackIntegration;