import React, { Component } from 'react';
import { Heading } from 'gestalt';

const URL = 'https://slack.com/api/oauth.access';

class SlackIntegrationRedirect extends Component {

  componentDidMount() {
    // send post to URL with code param, get back access token
    // save userid, bot access token, and default settings in a table
  }

  render() {
    return (
      <div>
        <Heading size="xs">Setting up Slack integration...</Heading>
      </div>
    );
  }
}

export default SlackIntegrationRedirect;