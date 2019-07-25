import React, { Component } from 'react';
import { Heading } from 'gestalt';
import axios from 'axios';
import { REDIRECT_URL } from './slack_integration';
import { ROOT_URL } from '../../actions/utils';
import queryString from 'query-string';

const URL = 'https://slack.com/api/oauth.access?';

class SlackIntegrationRedirect extends Component {

  componentDidMount() {
    // send post to URL with code param, get back access token
    // save userid, bot access token, and default settings in a table
    const params = queryString.parse(this.props.location.search);
    if (params.state !== process.env.REACT_APP_SLACK_STATE) {
      console.log('incorrect slack state verification code');
      return;
    }
    // TODO: check if process.env variables is safe to store secret keys
    axios.get(`${URL}client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&client_secret=${process.env.REACT_APP_SLACK_CLIENT_SECRET}&code=${params.code}&redirect_uri=${REDIRECT_URL}`)
      .then(res => {
        console.log(res);
        
      });
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