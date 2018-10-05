import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, Text } from 'gestalt';
import { fetchEntriesDaily } from '../../actions';
import { moodToColorMap } from '../constants';
import _ from 'lodash';

class DailyCalendar extends Component {
  componentWillMount() {
    // this.props.fetchEntriesDaily();
  }

  render() {
    const chunked = _.chunk(this.state.days, 5);
    return (
      <Box>
        {_.map(chunked, (chunk, i) => {
          return (
            <Box color="white" display="flex" direction="row" height={125} key={i}>
              {_.map(chunk, (day, j) => {
                const tag = i < 3 ? "Spark Pipeline Validation" : "Sideswipe Experiment";
                return (
                  <Column span={3} key={j}>
                    <Box position="relative" dangerouslySetInlineStyle={{
                      __style: { border: '1px solid lightgray', height: '100%' },
                    }}>
                      <Box color={moodToColorMap[day]} padding={1} flex="grow">
                        <Text>{(i * 7 + j + 1) % 31 + 1}</Text>
                      </Box>
                      <Box padding={1} position="absolute" bottom left>
                        <Text bold={true}>{`[${tag}]`}</Text>
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
  const { monthStart, monthEnd } = ownProps;
  return {};
}

export default connect(mapStateToProps, { fetchEntriesDaily })(DailyCalendar);
