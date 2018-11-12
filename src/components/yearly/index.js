import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, Heading, Text } from 'gestalt';
import { getWeeklyTags } from '../../actions/';
import _ from 'lodash';
import moment from 'moment';

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
  currentWeek: 29,
  yearStr: ''
};

class Yearly extends Component {
  constructor(props) {
    super(props);
    this.state = fakeData;
    this.state.yearStr = props.match.params.yearStr || moment().format('YYYY');
  }

  componentDidMount() {
    const yearStr = this.props.match.params.yearStr || moment().format('YYYY');
    this.setNewState(yearStr);
  }

  setNewState(yearStr) {
    const newState = this.state;
    newState.yearStr = yearStr;
    this.setState(newState);
    this.fetchData();
  }

  fetchData() {
    const startDate = moment().year(this.state.yearStr).startOf('year').startOf('isoWeek').format('YYYY-MM-DD');
    const endDate = moment().year(this.state.yearStr).endOf('year').endOf('isoWeek').format('YYYY-MM-DD');
    this.props.getWeeklyTags(startDate, endDate);
  }

  processRow(row) {
    /* 
      row has structure like this:
      row = [
        {
          date_string:
          tags: []
        }, ..., {}
      ]
    */
    function isContinued(first, second) {
      return moment(first).add(1, 'week').isSame(second);
    }

    const res = [];
    let curr = {};
    let nextCurr = {};
    // go through row
    for (const week of row) {
      for (const tag of week) {
        // if this tag exists in curr and should be extended to current week
        // we will delete it from curr map and add it to new curr map
        if (curr[tag] && isContinued(curr[tag][1], week.date_string)) {
          nextCurr[tag] = curr[tag];
          nextCurr[tag][1] = week.date_string;
          delete curr[tag];
        }
      }
      // take the leftovers of curr and add them to res, then swap curr and nextCurr
      for (const tag in curr) {
        res.push({
          tag: tag,
          start: curr[tag][0],
          end: curr[tag][1]
        });
      }
      curr = nextCurr;
      nextCurr = {};
    }
    // finally process the last elements in curr
    return res;
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

  drawQuarter(row, quarter) {
    const projects = this.state.projects[quarter];
    return (
      <Box margin={1} padding={1} key={quarter}>
        <Box display="flex" direction="row">
          {
            row.map((date, i) => {
              const currentWeek = moment().startOf('isoWeek');
              const color = date < currentWeek ? 'midnight' : (date > currentWeek ? 'blue' : 'watermelon');
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
    const rows = [];
    const runner = moment().year(this.state.yearStr).startOf('year').startOf('isoWeek');
    _.forEach(Array(4).fill(), (i) => {
      const row = [];
      _.forEach(Array(13).fill(), (j) => {
        row.push(_.cloneDeep(runner));
        runner.add(1, 'week');
      });
      rows.push(row);
    });
    return (
      <Box>
        <Box display="flex" direction="row" margin={2}>
          <Heading size="sm">{"We Are "}</Heading>&nbsp;<Heading size="sm" color="watermelon">Here</Heading>
        </Box>
        {
          rows.map((row, i) => (
            this.drawQuarter(row, i)
          ))
        }
      </Box>
    );
  }
}

function mapStateToProps({ weekly_tags }, ownProps) {
  return { weekly_tags };
}

export default connect(mapStateToProps, { getWeeklyTags })(Yearly);
