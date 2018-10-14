import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, Text } from 'gestalt';
import { moodToColorMap } from '../common/constants';
import _ from 'lodash';

class DailyCalendar extends Component {
  getColorForBox(day) {
    const dateStr = day.format('YYYY-MM-DD');
    const moodScore = _.get(this.props.daily_entries, `${dateStr}.mood_score`, 0);
    return moodToColorMap[moodScore];
  }

  drawTags(day) {
    const dateStr = day.format('YYYY-MM-DD');
    const tags = {};
    for (let update of _.get(this.props.daily_entries, `${dateStr}.updates`, [])) {
      for (let tag of update.tags) {
        tags[tag.tag] = 1;
      }
    }
    if (_.isEmpty(tags)) { 
      return; 
    }
    return (<Text>{`[${_.keys(tags).join(', ')}]`}</Text>);
  }

  render() {
    const { dates } = this.props;
    return (
      <Box>
        {_.map(dates, (row, i) => {
          return (
            <Box color="white" display="flex" direction="row" height={125} key={i}>
              {_.map(row, (day, j) => {
                return (
                  <Column span={3} key={j}>
                    <Box position="relative" dangerouslySetInlineStyle={{
                      __style: { border: '1px solid lightgray', height: '100%' },
                    }}>
                      <Box color={this.getColorForBox(day)} padding={1} flex="grow">
                        <Text>{day.format('D')}</Text>
                      </Box>
                      <Box padding={1} position="absolute" bottom left>
                        <Text bold={true}>{this.drawTags(day)}</Text>
                       </Box>
                    </Box>
                  </Column>
                );
              })}
            </Box>
          );
        })}
      </Box>
    );
  }
}

function mapStateToProps({ daily_entries }, ownProps) {
  return { daily_entries };
}

export default connect(mapStateToProps)(DailyCalendar);
