import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Divider, Icon, IconButton, Text } from 'gestalt';
import moment from 'moment';
import { moodToColorMap } from '../constants';

class DayBox extends Component {
  drawEntryContent(data) {
    if(!data) {
      return (
        <Box>
          <Text>Click the pencil to add some data!</Text>  
        </Box>
      );
    }
    return (
      <Box>
        <Box display="flex" direction="row">
          {Array(data.mood_score).fill().map((_, i) => (
            <Icon key={i} accessibilityLabel="rank" icon="smiley-outline" color="red" />
          ))}
        </Box>
        <Text>{data.mood_reason}</Text>
        <br />
        <Divider />
        <br />
        <Text bold={true}>Project Updates</Text>
        <br />
        {data.updates.map((update, i) => (
          <Text key={i} align="left">- {update.body} {this.drawTags(update.tags)}</Text>
        ))}
      </Box>
    );
  }

  drawTags(tags) {
    if(!tags || !tags.length) {
      return '[No Tags]';
    }
    return `[${tags.map(tag => (tag.tag)).join(', ')}]`;
  }

	render() {
    const { date, data } = this.props;
    if(moment().startOf('day') <= moment(date)) {
      return (
        <Box></Box>
      );
    }
    return (
      <Box color="lightGray" padding={1} margin={1} key={date}>
        <Box 
          display="flex"
          direction="row"
          alignItems="center"
          color={data ? moodToColorMap[data.mood_score]: moodToColorMap[0]}
          padding={2}
        >
          <Box flex="grow">
            <Text bold={true} size="lg">{moment(date).format('dddd, MMMM Do')}</Text>
          </Box>
          <IconButton
            accessibilityLabel="Edit"
            icon="edit"
            iconColor="white"
            size="sm"
          />
        </Box>
        <Box color="white" padding={2}>
          {this.drawEntryContent(data)}
        </Box>
      </Box>
    );
	}
}

export default connect()(DayBox);

