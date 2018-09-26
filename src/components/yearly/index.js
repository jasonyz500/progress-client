import React, { Component } from 'react';
import { Box, Column, Heading, Text } from 'gestalt';
import _ from 'lodash';

const fakeData = {
  projects: [
    [
      { name: "", start: 0, end: 0 },
      { name: "Spark event job", start: 1, end: 3 },
      { name: "Spark agg job", start: 4, end: 7 },
      { name: "Spark debugging", start: 8, end: 12 },
      { name: "", start: 0, end: 5 },
      { name: "Sideswipe experiment", start: 6, end: 9 },
      { name: "", start: 10, end: 12 },
    ],
    [
      { name: "Spark pipeline productionization", start: 0, end: 3 },
      { name: "Moat video development", start: 4, end: 7 },
      { name: "'True' - Collins 'I am Collins' Chung", start: 8, end: 12 },
    ],
    [{ name: "Hackathon", start: 0, end: 3 }, { name: "", start: 4, end: 12 }],
    []
  ],
  currentWeek: 29
};

class Yearly extends Component {
  constructor(props) {
    super(props);
    this.state = fakeData;
  }

  drawProjects(data) {
    /*
      draw projects for each row (quarter)
      collect information into this format:
        rows = [
          [
            {
              name: "some or no content",
              start: 0,
              end: 2
            },
            {... next pill in this row ...}
          ],
          [... second row ...]
        ]
      i would write a sexy algorithm for this but i can't be bothered for this hackathon
    */

    let rows = [];
    // LOL
    if (data.length < 6) {
      rows.push(data);
    } else {
      rows.push(data.slice(0, 4));
      rows.push(data.slice(4, 7));
    }
    return _.map(rows, (row, i) => (
      <Box display="flex" direction="row" key={i}>
        {
          _.map(row, pill => (
            <Column span={pill.end - pill.start + 1} key={`${pill.start}-${pill.end}`}>
              <Box shape="pill" color={pill.name ? "lightGray" : "transparent"} marginTop={1} padding={1}>
                <Text align="center">{pill.name}</Text>
              </Box>
            </Column>
          ))
        }
      </Box>
    ));
  }

  drawQuarter(quarter, projects) {
    const { currentWeek } = this.state;
    return (
      <Box margin={1} padding={1} key={quarter}>
        <Box display="flex" direction="row">
          {
            Array(13).fill().map((_, i) => {
              const thisWeek = quarter * 13 + i;
              const color = thisWeek < currentWeek ? "midnight" : (thisWeek > currentWeek ? "blue" : "watermelon")
              return (
                <Column span={1} key={i}>
                  <Box shape="circle" height={45} width={45} color={color}></Box>
                </Column>
              );
            })
          }
        </Box>
        {
          this.drawProjects(projects)
        }
      </Box>
    );
  }

  render() {
    return (
      <Box>
        <Box display="flex" direction="row" margin={2}>
          <Heading size="sm">{"We Are "}</Heading>&nbsp;<Heading size="sm" color="watermelon">Here</Heading>
        </Box>
        {
          Array(4).fill().map((_, i) => (
            this.drawQuarter(i, this.state.projects[i])
          ))
        }
      </Box>
    );
  }
}

export default Yearly;
