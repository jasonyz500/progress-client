import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Column, Flyout, Heading, Text } from 'gestalt';
import { getWeeklyTags } from '../../actions/';
import _ from 'lodash';
import moment from 'moment';

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

  // this function draws the dots for the quarter and also the box layer underneath that holds the tags
  drawQuarter(row, quarter) {
    const { weekly_tags } = this.props;

    /*
      group tags for this quarter (row) into this format:
      [{ name: tag, start: idx, end: idx }, {...}, ...]
    */
    function groupTags() {
      const res = [];
      let curr = {};
      // iterate over each week in the row and get all tags for that week from global state
      _.forEach(row, (weekMoment, idx) => {
        const weekStr = weekMoment.format('YYYY-MM-DD');
        for (const tag of weekly_tags[weekStr] || []) {
          // either update curr map with current week as last seen date, or add the tag as a new entry
          if (curr[tag]) {
            curr[tag][1] = idx;
          } else {
            curr[tag] = [idx, idx];
          }
        }
        // purge curr map of any tags that weren't extended into this week and add them to res
        for (const tag in curr) {
          if (curr[tag][1] !== idx) {
            res.push({
              name: tag,
              start: curr[tag][0],
              end: curr[tag][1]
            });
            delete curr[tag];
          }
        }
      });
      return res;
    }

    /*
      for each quarter, take the tags and slot them into as few rows as possible where no row has any overlap
      input: [{ name: name, start: idx, end: idx }, {...}, ...]
      output: [ [{...}, {...}], [{...}, ...] ]
      current implementation is, for each new bubble, slot it into the first available row
    */
    function organizeGroupedTags(groupedTags) {
      const res = [];
      for (const tag of groupedTags) {
        let pushed = false;
        for (const row of res) {
          if (row[row.length-1].end < tag.start) {
            row.push(tag);
            pushed = true;
            break;
          }
        }
        // if we haven't yet slotted it into an existing row, create a new one
        if (!pushed) {
          res.push([tag]);
          pushed = false;
        }
      }
      return res;
    }

    /*
      fill in gaps
      just go through bubbles and add empty bubbles where needed
    */
    function fillBlanks(bubbleRows) {
      const res = [];
      for (const row of bubbleRows) {
        const inner = [];
        let currIndex = 0;
        for (const bubble of row) {
          if (bubble.start !== currIndex) {
            // push a blank bubble
            inner.push({
              name: '',
              start: currIndex,
              end: bubble.start - 1
            });
          }
          inner.push(bubble);
          currIndex = bubble.end + 1;
        }
        if (currIndex !== 13) {
          inner.push({
            name: '',
            start: currIndex,
            end: 12
          });
        }
        res.push(inner);
      }
      return res;
    }

    const groupedTags = groupTags();
    const organizedTags = organizeGroupedTags(groupedTags);
    const bubbles = fillBlanks(organizedTags);

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
        { this.drawProjects(bubbles) }
      </Box>
    );
  }

  drawProjects(rows) {
    return _.map(rows, (row, i) => (
      <Box display="flex" direction="row" key={i}>
        {
          _.map(row, pill => (
            <Column span={pill.end - pill.start + 1} key={`${i}.${pill.start}.${pill.end}`}>
              <Box shape="pill" color={pill.name ? "lightGray" : "transparent"} marginTop={1} padding={1}>
                <Text align="center">{pill.name}</Text>
              </Box>
            </Column>
          ))
        }
      </Box>
    ));
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
