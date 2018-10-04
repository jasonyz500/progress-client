import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, IconButton, Text } from 'gestalt';
import { moodToColorMap } from '../constants';
import _ from 'lodash';

const fakeData = {
  weeks: [
    {
      mood: 5,
      entries: [
        {
          headline: "Wrapped up video aggregation job. Finally shipped first spark code to prod",
          body: "Learned a lot about spark",
          tags: ["Spark", "Aggregation job refactor"]
        },
        {
          headline: "Added code for force requesting CPC only ads. Involved diving through some new Mohawk code.",
          body: "",
          tags: ["Sideswipe Experiment"]
        }
      ]
    },
    {
      mood: 3,
      entries: [
        {
          headline: "Landed image quality bug for carousel creation",
          body: "",
          tags: ["Carousel", "Creation"]
        },
        {
          headline: "Finishing up front end work for reporting",
          body: "",
          tags: ["Carousel", "Reporting"]
        }
      ]
    },
    {
      mood: 4,
      entries: [
        {
          headline: "Investigate dblwideflag discrepency sent to Moat",
          body: "",
          tags: ["Moat", "Spark"]
        }
      ]
    },
    {
      mood: 2,
      entries: [
        {
          headline: "Updated validation rule to account for every creative type supported in bulk",
          body: "",
          tags: []
        },
        {
          headline: "'True' - Collins 'I am Collins' Chung 2018",
          body: "",
          tags: ["Collins Chung", "2018"]
        }
      ]
    },
    {
      mood: 3,
      entries: []
    },
  ],
  dailyView: false,
  title: "July 2018"
};

class WeeklyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = fakeData;
  }

  render() {
    const data = this.state.weeks;
    return _.map(data, (week, i) => {
      return (
        <Box key={i}>
          <Box display="flex" direction="row" marginBottom={1}>
            {
              Array(5).fill().map((_, j) => (
                <Column span={3} key={j}>
                  <Box color={moodToColorMap[week.mood]} padding={1} dangerouslySetInlineStyle={{
                    __style: { border: '1px solid lightgray' }
                  }}>
                    <Text>{(i * 7 + j + 1) % 31 + 1}</Text>
                  </Box>
                </Column>
              ))
            }
          </Box>
          <Box color="white" padding={2} height={100} dangerouslySetInlineStyle={{
            __style: { 'borderLeft': '1px solid lightgray', 'borderRight': '1px solid lightgray', 'borderBottom': '1px solid lightgray' }
          }}>
            <Text bold={true}>Weekly Project Updates</Text>
            {_.map(week.entries, entry => (
              <Text align="left" key={entry.headline}>
                - {entry.headline} {entry.tags && entry.tags.length ? `[${entry.tags.join(', ')}]` : "[No tags]"}
              </Text>
            ))}
          </Box>
        </Box>
      );
    });
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(WeeklyCalendar);
