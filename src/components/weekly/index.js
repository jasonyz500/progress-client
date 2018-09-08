import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Divider, Heading, Icon, IconButton, Text } from 'gestalt';
import moment from 'moment';
import { fetchEntriesDaily } from '../../actions/';
import { moodToColorMap } from '../constants';

class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const weekStr = this.props.match.params.weekStr || moment().startOf('isoWeek').format('YYYY-MM-DD');
    this.setNewWeekState(weekStr);
  }

  // functions for changing weeks
  handlePreviousWeek() {
    this.handleChangeWeek(-7);
  }

  handleNextWeek() {
    this.handleChangeWeek(7);
  }

  handleChangeWeek(diff) {
    const { weekStr } = this.state;
    const nextWeekStr = moment(weekStr).add(diff, 'days').format('YYYY-MM-DD');
    this.props.history.push(`/weekly/${nextWeekStr}`);
    this.setNewWeekState(nextWeekStr);
  }

  setNewWeekState(weekStr) {
    const weekStrEnd = moment(weekStr).add(5, 'days').format('YYYY-MM-DD');
    const newState = this.state;
    // figure out shorthand for this later
    newState.weekStr = weekStr;
    newState.weekStrEnd = weekStrEnd;
    this.setState(newState);
    this.fetchData();
  }

  fetchData() {
    this.props.fetchEntriesDaily(this.state.weekStr, this.state.weekStrEnd);
  }

  // functions for rendering
  getDisplayTitle() {
    const { weekStr, weekStrEnd } = this.state;
    const start = moment(weekStr);
    const end = moment(weekStrEnd);
    const firstHalf = start.format('MMMM D');
    const secondHalf = start.month() === end.month() ? end.format('D') : end.format('MMMM D');
    return `${firstHalf} - ${secondHalf} (Week ${start.format('W')})`
  }

  drawDay(date, data) {
    if(!data) {
      return;
    }
    return (
      <Box color="lightGray" padding={1} margin={1} key={date}>
        <Box color={moodToColorMap[data.mood_score]} padding={2}>
          <Text bold={true} size="lg">{moment(date).format('dddd, MMMM Do')}</Text>
        </Box>
        <Box color="white" padding={2}>
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
    const { weekStrEnd } = this.state;
    const days = [...Array(5).keys()].map(i => ( moment(weekStrEnd).subtract(i, 'days').format('YYYY-MM-DD')) );
    return (
      <Box>
        <Box marginTop={2} display="flex" direction="row" alignItems="center" alignContent="center">
          <IconButton
            accessibilityLabel="Previous Week"
            icon="arrow-back"
            onClick={this.handlePreviousWeek.bind(this)}
          />
          <Heading size="xs">{this.getDisplayTitle()}</Heading>
          <IconButton
            accessibilityLabel="Next Week"
            icon="arrow-forward"
            onClick={this.handleNextWeek.bind(this)}
          />
        </Box>
        {days.map(day => (
          this.drawDay(day, this.props.daily_entries[day])
        ))}
      </Box>
    );
  }
}

function mapStateToProps({ daily_entries }) {
  // ideally will only strip off the required entries for this week
  return { daily_entries };
}

export default connect(mapStateToProps, { fetchEntriesDaily })(Weekly);
