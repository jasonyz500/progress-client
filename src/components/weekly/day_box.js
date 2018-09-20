import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, Heading, Icon, IconButton, Label, Modal, Text, TextField } from 'gestalt';
import moment from 'moment';
import _ from 'lodash';
import { moodToColorMap } from '../constants';
import { createEntry, updateEntry } from '../../actions/';

class DayBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      dateStr: props.dateStr
    };
  }

  drawEntryContent(entry) {
    if(_.isEmpty(entry)) {
      return (
        <Box>
          <Text>Click the pencil to add some data!</Text>  
        </Box>
      );
    }
    return (
      <Box>
        <Box display="flex" direction="row">
          {Array(entry.mood_score).fill().map((_, i) => (
            <Icon key={i} accessibilityLabel="rank" icon="smiley-outline" color="red" />
          ))}
        </Box>
        <Text>{entry.mood_reason}</Text>
        <br />
        <Divider />
        <br />
        <Text bold={true}>Project Updates</Text>
        <br />
        {entry.updates.map((update, i) => (
          <Text key={i} align="left">- {update.body} {this.drawTags(update.tags)}</Text>
        ))}
      </Box>
    );
  }

  drawTags(tags) {
    if(!tags || !tags.length) {
      return '[No Tags]';
    }
    return `[${tags.map(tag => (tag.tag)).join(', ')}]`;
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  handleSave() {

  }

  drawEditModal(dateStr, entry) {
    return (
      <Modal
        accessibilityCloseLabel="close"
        accessibilityModalLabel="edit"
        heading={moment(dateStr).format('dddd, MMMM Do')}
        onDismiss={this.toggleModal.bind(this)}
        size="lg"
        footer={
          <Box
            display="flex"
            direction="row"
            justifyContent="end"
          >
            <Box paddingX={1}>
              <Button text="Cancel" inline onClick={this.toggleModal.bind(this)} />
            </Box>
            <Button color="red" inline text="Save" onClick={this.handleSave.bind(this)}/>
          </Box>
        }
      >
        <Box display="flex" direction="row" position="relative" alignContent="center">
          <Column span={12}>
            <Box paddingY={2} paddingX={4} display="flex">
              <Column span={4}>
                <Label htmlFor="mood_score">
                  <Text align="left" bold>Mood Score</Text>
                </Label>
              </Column>
              <Column span={8}>
                <Box display="flex" direction="row">
                {
                  [...Array(5).keys()].map(i => (
                    <IconButton
                      key={i}
                      accessibilityLabel={`Select ${i+1} Stars`}
                      icon="smiley-outline"
                      iconColor={entry && entry.mood_score > i ? 'red' : 'gray'}
                    />
                  ))
                }
                </Box>
              </Column>
            </Box>
            <Box paddingY={2} paddingX={4} display="flex">
              <Column span={4}>
                <Label htmlFor="mood_reason">
                  <Text align="left" bold>Mood Reason</Text>
                </Label>
              </Column>
              <Column span={8}>
                <TextField id="mood_reason" onChange={() => undefined} value={entry.mood_reason}/>
              </Column>
            </Box>
            <Divider />
            <Heading size="xs">Updates</Heading>
            <Box paddingY={2} paddingX={4} display="flex">
              <Column span={4}>
                <Label htmlFor="update">
                  <Text align="left" bold>Update</Text>
                </Label>
              </Column>
              <Column span={8}>
                <TextField id="update" onChange={() => undefined} />
              </Column>
            </Box>                
            <IconButton 
              accessibilityLabel="add an update"
              icon="add-circle"
              iconColor="red"
              size="xl"
            />
          </Column>
        </Box>
      </Modal>
    );
  }

	render() {
    const { dateStr, entry } = this.props;
    if(moment().startOf('day') <= moment(dateStr)) {
      return (
        <Box></Box>
      );
    }
    return (
      <Box color="lightGray" padding={1} margin={1} key={dateStr}>
        <Box 
          display="flex"
          direction="row"
          alignItems="center"
          color={entry ? moodToColorMap[entry.mood_score]: moodToColorMap[0]}
          padding={2}
        >
          <Box flex="grow">
            <Text bold={true} size="lg">{moment(dateStr).format('dddd, MMMM Do')}</Text>
          </Box>
          <IconButton
            accessibilityLabel="Edit"
            icon="edit"
            iconColor="white"
            size="sm"
            onClick={this.toggleModal.bind(this)}
          />
        </Box>
        <Box color="white" padding={2}>
          {this.drawEntryContent(entry)}
        </Box>
        {this.state.showModal && this.drawEditModal(dateStr, entry)}
      </Box>
    );
	}
}

function mapStateToProps({ daily_entries }, ownProps) {
  const { dateStr } = ownProps;
  return {
    entry: daily_entries[dateStr] || {}
  }
}

export default connect(mapStateToProps, { createEntry, updateEntry })(DayBox);

