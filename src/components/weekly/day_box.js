import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Divider, Icon, IconButton, Text } from 'gestalt';
import moment from 'moment';
import _ from 'lodash';
import { moodToColorMap } from '../common/constants';
import { drawTags, drawWithNewlines } from '../common/utils';
import { createEntry, updateEntry, getTags } from '../../actions/';
import '../common/tags.css';

class DayBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStr: props.dateStr
    };
  }

  drawEntryContent(entry) {
    // if(_.isEmpty(entry)) {
    //   return (
    //     <Box>
    //       <Text>Click the pencil to add some data!</Text>  
    //     </Box>
    //   );
    // }
    return (
      <Box>
        <Box display="flex" direction="row">
          {Array(entry.mood_score).fill().map((_, i) => (
            <Icon key={i} accessibilityLabel="rank" icon="smiley-outline" color="red" />
          ))}
        </Box>
        <Text>{drawWithNewlines(entry.mood_reason)}</Text>
        <br />
        <Divider />
        <br />
        <Text bold={true}>Project Updates</Text>
        <br />
        {entry.updates.map((update, i) => (
          <Text key={i} align="left">
            <b>{i+1}. </b>
            {drawWithNewlines(update.body)}
            {drawTags(update.tags)}
            <br />
            <br />
          </Text>
        ))}
      </Box>
    );
  }

	render() {
    const { dateStr, entry } = this.props;
    if(moment().startOf('day') < moment(dateStr)) {
      return (
        <Box>
        </Box>
      );
    }
    return (
      <Box color="lightGray" padding={1} margin={1} key={dateStr}>
        <Box 
          display="flex"
          direction="row"
          alignItems="center"
          color={entry ? moodToColorMap[entry.mood_score]: moodToColorMap[0]}
          padding={2}
        >
          <Box flex="grow">
            <Text bold={true} size="lg">{moment(dateStr).format('dddd, MMMM Do')}</Text>
          </Box>
          <Link to={`/edit/daily/${dateStr}`}>
            <IconButton
              accessibilityLabel="edit"
              icon="edit"
              iconColor="white"
              size="sm"
            />
          </Link>
        </Box>
        <Box color="white" padding={2}>
          {this.drawEntryContent(entry)}
        </Box>
      </Box>
    );
	}
}

function mapStateToProps({ daily_entries, tags }, ownProps) {
  const { dateStr } = ownProps;
  return {
    entry: daily_entries[dateStr] || {
      date_string: dateStr,
      mood_score: 0,
      mood_reason: '',
      updates: []
    },
    tags: _.map(tags, (tag) => ({ id: tag, text: tag }))
  }
}

export default connect(mapStateToProps, { createEntry, updateEntry, getTags })(DayBox);

