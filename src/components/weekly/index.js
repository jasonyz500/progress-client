import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Divider, Heading, Icon, IconButton, Text } from 'gestalt';
import { dayNamesMap, moodToColorMap } from '../constants';
import moment from 'moment';

const fakeData = {
  title: "July 16-20 (Q3 Week 3)",
  days: [
    {
      mood: {
        score: 5,
        reason: "Able to spend the day diving deep into my project and cranking out lots of code."
      },
      entries: [
        {
          headline: "Continue investigating safe_frontend_event for closeup impression validation.",
          tags: ["Sideswipe validation"],
          body: "datahub/presto slowness + down parts of the day"
        },
        {
          headline: "Setup android env.",
          tags: ["Android"],
          body: "It was a pain"
        }
      ]
    },
    {
      mood: {
        score: 4,
        reason: "I made some big progress on spark data pipelines."
      },
      entries: [
        {
          headline: "Created additional test runs for CPM automation",
          body: ""
        },
        {
          headline: "Focused on formatting MOAT automation tests & uploaded to TestRail project (~700 test cases)!"
        }
      ]
    },
    {
      mood: {
        score: 3,
        reason: "Morning was pretty productive but I got blocked towards the end of the day."
      },
      entries: [
        {
          headline: "Landed all bulk pepsi and pinboard diffs",
          body: ""
        },
        {
          headline: "Setup android env",
          body: "It was a pain"
        }
      ]
    },
    {
      mood: {
        score: 2,
        reason: "Wasted 4 hours of my day debugging some legacy code that nobody knew anything about."
      },
      entries: [
        {
          headline: "Diff to remove admin mode access for carousel in ads manager",
          body: "",
          tags: ["Carousel", "Ads manager"]
        },
        {
          headline: "Diff to update secondary review job to run daily instead of hourly"
        }
      ]
    },
    {
      mood: {
        score: 1,
        reason: "It's so painful running long queries on datahub Presto, and sometimes it dies."
      },
      entries: [
        {
          headline: "Update the metro upload script to have metro results sorted so it's easier to see failures in groups/area in code",
          tags: ["Automated testing"]
        }
      ]
    }
  ]
};

class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = fakeData;
    const weekStr = props.match.params.weekStr || moment().startOf('isoWeek').format('YYYY-MM-DD');
    this.state.weekStr = weekStr;
  }

  componentDidMount() {
    this.fetchData();
  }

  handlePreviousWeek() {
    const { weekStr } = this.state;
    const previousWeekStr = moment(weekStr).subtract(7, 'days').format('YYYY-MM-DD');
    this.props.history.push(`/weekly/${previousWeekStr}`);
    this.setState({ ...this.state, weekStr: previousWeekStr });
  }

  handleNextWeek() {
    const { weekStr } = this.state;
    const nextWeekStr = moment(weekStr).add(7, 'days').format('YYYY-MM-DD');
    this.props.history.push(`/weekly/${nextWeekStr}`);
    this.setState({ ...this.state, weekStr: nextWeekStr });
  }

  fetchData() {

  }

  drawDay(name, data) {
    return (
      <Box color="lightGray" padding={1} margin={1} key={name}>
        <Box color={moodToColorMap[data.mood.score]} padding={2}>
          <Text bold={true} size="lg">{name}</Text>
        </Box>
        <Box color="white" padding={2}>
          <Box display="flex" direction="row">
            {Array(data.mood.score).fill().map((_, i) => (
              <Icon key={i} accessibilityLabel="rank" icon="smiley-outline" color="red" />
            ))}
          </Box>
          <Text>{data.mood.reason}</Text>
          <br />
          <Divider />
          <br />
          <Text bold={true}>Project Updates</Text>
          <br />
          {data.entries.map((entry, i) => (
            <Text key={i} align="left">- {entry.headline} {entry.tags && entry.tags.length ? `[${entry.tags.join(', ')}]` : "[No tags]"}</Text>
          ))}
        </Box>
      </Box>
    );
  }

  render() {
    const data = this.state;
    return (
      <Box>
        <Box marginTop={2} display="flex" direction="row" alignItems="center" alignContent="center">
          <IconButton
            accessibilityLabel="Previous Week"
            icon="arrow-back"
            onClick={this.handlePreviousWeek.bind(this)}
          />
          <Heading size="xs">{data.title}</Heading>
          <IconButton
            accessibilityLabel="Next Week"
            icon="arrow-forward"
            onClick={this.handleNextWeek.bind(this)}
          />
        </Box>
        {data.days.map((day, i) => (
          this.drawDay(dayNamesMap[i], day)
        ))}
      </Box>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(Weekly);
