import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, Heading, IconButton, Label, Switch, Text } from 'gestalt';
import moment from 'moment';
import _ from 'lodash';
import WeeklyCalendar from './weekly_calendar';
import DailyCalendar from './daily_calendar';
import { fetchUpdatesWeekly, fetchEntriesDaily } from '../../actions';

class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = { dailyView: false };
  }

  componentDidMount() {
    const monthStr = this.props.match.params.monthStr || moment().startOf('month').format('YYYY-MM');
    this.setNewMonthState(monthStr);
  }

  handleChangeView() {
    this.setState({ dailyView: !this.state.dailyView });
  }

  handleNextMonth() {
    this.handleChangeMonth(1);
  }

  handlePreviousMonth() {
    this.handleChangeMonth(-1);
  }

  handleChangeMonth(diff) {
    const { monthStr } = this.state;
    const nextMonthStr = moment(monthStr).add(diff, 'months').format('YYYY-MM');
    this.props.history.push(`/monthly/${nextMonthStr}`);
    this.setNewMonthState(nextMonthStr);
  }

  setNewMonthState(monthStr) {
    this.setState(prevState => ({ monthStr: monthStr }))
    this.fetchData();
  }

  fetchData() {
    this.props.fetchUpdatesWeekly(this.state.monthStr);
    const monthStart = moment(this.state.monthStr).startOf('month').format('YYYY-MM-DD');
    const monthEnd = moment(this.state.monthStr).endOf('month').format('YYYY-MM-DD');
    this.props.fetchEntriesDaily(monthStart, monthEnd);
  }

  getDatesToRender() {
    const { monthStr } = this.state;
    const start = moment(monthStr).startOf('month').startOf('isoWeek');
    const end = moment(monthStr).endOf('month').endOf('isoWeek').add(-2, 'days');
    const res = [];
    while (start <= end) {
      const week = [];
      Array(5).fill().forEach(() => {
        week.push(_.cloneDeep(start));
        start.add(1, 'days');
      });
      res.push(week);
      start.add(2, 'days');
    }
    return res;
  }

  render() {
    const state = this.state;
    return (
      <Box>
        <Box paddingY={1}>
          <Label htmlFor="dateView">
            <Text>{"Toggle Daily / Weekly Breakdown"}</Text>
          </Label>
        </Box>
        <Switch
          onChange={this.handleChangeView.bind(this)}
          id="dateView"
          switched={this.state.dailyView}
        />
        <Box marginTop={2} display="flex" direction="row" alignItems="center" alignContent="center">
          <IconButton
            accessibilityLabel="Previous Month"
            icon="arrow-back"
            onClick={this.handlePreviousMonth.bind(this)}
          />
          <Heading size="xs">{moment(state.monthStr).format('MMMM YYYY')}</Heading>
          <IconButton
            accessibilityLabel="Next Month"
            icon="arrow-forward"
            onClick={this.handleNextMonth.bind(this)}
          />
        </Box>
        <Box color="white" display="flex" direction="row" padding={1} marginTop={1} alignItems="center" alignContent="center" bottom={true}>
          {_.map(["Mon", "Tue", "Wed", "Thu", "Fri"], day => {
            return (
              <Column span={3} key={day}>
                <Box color="white" padding={1} marginRight={1}>
                  <Text bold={true} align="center">{day}</Text>
                </Box>
              </Column>
            );
          })}
        </Box>
        {state.dailyView ? <DailyCalendar dates={this.getDatesToRender()}/> : <WeeklyCalendar dates={this.getDatesToRender()} />}
      </Box>
    );
  }
}

export default connect(null, { fetchUpdatesWeekly, fetchEntriesDaily })(Monthly);
