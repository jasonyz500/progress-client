import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, Divider, IconButton, Text } from 'gestalt';
import { moodToColorMap } from '../constants';
import _ from 'lodash';
import moment from 'moment';

class WeeklyCalendar extends Component {
  getWeekMoodFromDays(weekStr) {
    const days = Array(5).fill().map((_, i) => moment(weekStr).add(i, 'days').format('YYYY-MM-DD'));
    const entries = _.filter(_.map(days, ds => this.props.daily_entries[ds]), 'mood_score');
    if (entries.length === 0) return moodToColorMap[0];
    const avg = _.sum(_.map(entries, 'mood_score')) / entries.length;
    return moodToColorMap[avg];
  }

  render() {
    const { dates, weekly_updates } = this.props;
    return _.map(dates, (week, i) => {
      return (
        <Box key={i}>
          <Box display="flex" direction="row" marginBottom={1}>
            {
              _.map(week, (day, j) => (
                <Column span={3} key={j}>
                  <Box color={this.getWeekMoodFromDays(week[0])} padding={1} dangerouslySetInlineStyle={{
                    __style: { border: '1px solid lightgray' }
                  }}>
                    <Text>{day.format('D')}</Text>
                  </Box>
                </Column>
              ))
            }
          </Box>
          <Box color="white" padding={2} height="100%" dangerouslySetInlineStyle={{
            __style: { 'borderLeft': '1px solid lightgray', 'borderRight': '1px solid lightgray', 'borderBottom': '1px solid lightgray' }
          }}>
            <Box display="flex" direction="row" alignItems="center" paddingX={1}>
              <Box flex="grow">
                <Text bold={true}>Weekly Project Updates</Text>
              </Box>
              <IconButton
                accessibilityLabel="edit"
                icon="edit"
                iconColor="red"
                size="sm"
              />
            </Box>
            <Divider />
            <Box paddingX={1} paddingY={2}>
              {_.map(week.entries, entry => (
                <Text align="left" key={entry.headline}>
                  - {entry.headline} {entry.tags && entry.tags.length ? `[${entry.tags.join(', ')}]` : "[No tags]"}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>
      );
    });
  }
}

function mapStateToProps({ daily_entries, weekly_updates }, ownProps) {
  return { daily_entries, weekly_updates };
}

export default connect(mapStateToProps)(WeeklyCalendar);