import React, { Component } from 'react';
import { Box, Column, Heading, IconButton, Label, Switch, Text } from 'gestalt';
import { moodToColorMap } from '../constants';
import _ from 'lodash';

const fakeData = {
  days: Array(25).fill(),
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

for(let i in fakeData.days) {
  fakeData.days[i] = Math.floor(Math.random() * 5) + 1;
}

class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = fakeData;
    this.handleChange = this._handleChange.bind(this);
  }

  _handleChange() {
    this.setState({ dailyView: !this.state.dailyView });
  }

  drawDailyCalendar() {
    const chunked = _.chunk(this.state.days, 5);
    return (
      <Box>
        {_.map(chunked, (chunk, i) => {
          return (
            <Box color="white" display="flex" direction="row" height={125}>
              {_.map(chunk, (day, j) => {
                const tag = i < 3 ? "Spark Pipeline Validation" : "Sideswipe Experiment";
                return (
                  <Column span={3} id={j}>
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

  drawWeeklyCalendar() {
    const data = this.state.weeks;
    return _.map(data, (week, i) => {
      return (
        <Box>
          <Box display="flex" direction="row" marginBottom={1}>
            {
              Array(5).fill().map((_, j) => (
                <Column span={3}>
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
              <Text align="left">- {entry.headline} {entry.tags && entry.tags.length ? `[${entry.tags.join(', ')}]` : "[No tags]"}</Text>
            ))}
          </Box>
        </Box>
      );
    });
  }

  render() {
    const data = this.state;
    return (
      <Box>
        <Box paddingY={1}>
          <Label htmlFor="dateView">
            <Text>{"Show colors for each day"}</Text>
          </Label>
        </Box>
        <Switch
          onChange={this.handleChange}
          id="dateView"
          switched={this.state.dailyView}
        />
        <Box marginTop={2} display="flex" direction="row" alignItems="center" alignContent="center">
          <IconButton
            accessibilityLabel="Previous Month"
            icon="arrow-back"
          />
          <Heading size="xs">{data.title}</Heading>
          <IconButton
            accessibilityLabel="Next Month"
            icon="arrow-forward"
          />
        </Box>
        <Box color="white" display="flex" direction="row" padding={1} marginTop={1} alignItems="center" alignContent="center" bottom={true}>
          {_.map(["Mon", "Tue", "Wed", "Thu", "Fri"], day => {
            return (
              <Column span={3} id={day}>
                <Box color="white" padding={1} marginRight={1}>
                  <Text bold={true} align="center">{day}</Text>
                </Box>
              </Column>
            );
          })}
        </Box>
        {data.dailyView ? this.drawDailyCalendar() : this.drawWeeklyCalendar()}
      </Box>
    );
  }
}

export default Monthly;
