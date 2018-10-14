import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Heading, IconButton } from 'gestalt';
import moment from 'moment';
import DayBox from './day_box';
import { fetchEntriesDaily } from '../../actions/';
import { getDisplayTitle } from '../common/utils';

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
    const weekStrEnd = moment(weekStr).add(4, 'days').format('YYYY-MM-DD');
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

  render() {
    const { weekStr, weekStrEnd } = this.state;
    const days = [...Array(5).keys()].map(i => ( moment(weekStrEnd).subtract(i, 'days').format('YYYY-MM-DD')) );
    return (
      <Box>
        <Box marginTop={2} display="flex" direction="row" alignItems="center" alignContent="center">
          <IconButton
            accessibilityLabel="Previous Week"
            icon="arrow-back"
            onClick={this.handlePreviousWeek.bind(this)}
          />
          <Heading size="xs">{getDisplayTitle(weekStr)}</Heading>
          <IconButton
            accessibilityLabel="Next Week"
            icon="arrow-forward"
            onClick={this.handleNextWeek.bind(this)}
          />
        </Box>
        {days.map(day => (
          <DayBox
            key={day}
            dateStr={day}
          />
        ))}
      </Box>
    );
  }
}

export default connect(null, { fetchEntriesDaily })(Weekly);
